-- Per client: the timer that waits for scrolling to stop.
local scroll_timers = {}

-- Neovim asks for the inlay hints of the whole buffer after every edit, which on a large IFC file
-- means every hint in the file (https://github.com/neovim/neovim/issues/42848). Ask only for the
-- visible lines plus one window height above and below. Ask again once scrolling stops, and only
-- when the visible lines have left the lines asked for last.
local function request_visible_inlay_hints(client)
  -- The zero-based lines of the window showing `bufnr`, end exclusive.
  local function visible_lines(bufnr)
    local win = vim.api.nvim_get_current_buf() == bufnr and vim.api.nvim_get_current_win()
      or vim.fn.bufwinid(bufnr)
    if win == -1 then
      return nil
    end
    return vim.fn.line('w0', win) - 1, vim.fn.line('w$', win)
  end

  -- Per buffer: the lines the last request covered.
  local requested = {}
  local request = client.request
  client.request = function(self, method, params, handler, bufnr)
    if method == 'textDocument/inlayHint' and params and params.range and bufnr then
      local top, bottom = visible_lines(bufnr)
      if top then
        local height = bottom - top
        local first, last = math.max(top - height, 0), bottom + height
        requested[bufnr] = { first, last }
        -- The server clamps an end past the last line.
        params.range = {
          start = { line = first, character = 0 },
          ['end'] = { line = last, character = 0 },
        }
      end
    end
    return request(self, method, params, handler, bufnr)
  end

  local timer = assert(vim.uv.new_timer())
  scroll_timers[client.id] = timer
  vim.api.nvim_create_autocmd('WinScrolled', {
    group = vim.api.nvim_create_augroup('ifc-inlay-hints-' .. client.id, { clear = true }),
    callback = function()
      timer:stop()
      timer:start(250, 0, vim.schedule_wrap(function()
        if client:is_stopped() then
          return
        end
        for bufnr in pairs(client.attached_buffers) do
          local top, bottom = visible_lines(bufnr)
          local range = requested[bufnr]
          if
            top
            and vim.lsp.inlay_hint.is_enabled({ bufnr = bufnr })
            and not (range and range[1] <= top and bottom <= range[2])
          then
            -- Asks again for the hints of every visible buffer that has them enabled.
            vim.lsp.inlay_hint.on_refresh(nil, nil, { client_id = client.id })
            return
          end
        end
      end))
    end,
  })
end

---@type vim.lsp.Config
return {
  cmd = { 'ifc-language-server' },
  filetypes = { 'ifc' },
  root_markers = { '.git' },
  workspace_required = false,
  on_init = request_visible_inlay_hints,
  on_exit = function(_, _, client_id)
    -- Neovim calls this where autocommands can't be changed.
    vim.schedule(function()
      pcall(vim.api.nvim_del_augroup_by_name, 'ifc-inlay-hints-' .. client_id)
    end)
    local timer = scroll_timers[client_id]
    if timer then
      timer:close()
      scroll_timers[client_id] = nil
    end
  end,
}
