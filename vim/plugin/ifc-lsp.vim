augroup ifc_lsp
  au!
  au User lsp_setup call lsp#register_server({
        \ 'name': 'ifc-language-server',
        \ 'cmd': ['ifc-language-server'],
        \ 'allowlist': ['ifc'],
        \ })
  au User lsp_buffer_enabled if &filetype ==# 'ifc' | setlocal omnifunc=lsp#complete | endif
augroup END
