hook -group lsp-filetype-ifc global BufSetOption filetype=ifc %{
    set-option buffer lsp_servers %{
        [ifc-language-server]
        root_globs = [".git"]
    }
}
