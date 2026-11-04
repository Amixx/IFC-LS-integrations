# Neovim

Neovim 0.11 or later. From the root of this repository, copy the syntax, file-type and LSP files into your config:

```sh
cp -R neovim/ftdetect neovim/lsp neovim/syntax ~/.config/nvim/
```

Then enable the server in `init.lua`:

```lua
vim.lsp.enable('ifc')
```

Colouring and the server connection work on files of at least 180 MB. The file-type rule takes priority over
size-based detection such as LazyVim's snacks.nvim `bigfile`. On lines of hundreds of thousands of characters, semantic
colours take minutes to fill in, as Neovim's cost per token grows with line length.
