# Vim

Vim 9 with [vim-lsp](https://github.com/prabirshrestha/vim-lsp). The syntax file is the one in
[`neovim/syntax/`](../neovim/syntax/ifc.vim). From the root of this repository, copy the syntax, file-type and server
files into `~/.vim` and install vim-lsp as a package:

```sh
mkdir -p ~/.vim/syntax ~/.vim/pack/plugins/start
cp neovim/syntax/ifc.vim ~/.vim/syntax/
cp -R vim/ftdetect vim/plugin ~/.vim/
git clone https://github.com/prabirshrestha/vim-lsp ~/.vim/pack/plugins/start/vim-lsp
```

Your `vimrc` needs `filetype on` and `syntax on`.
[`plugin/ifc-lsp.vim`](plugin/ifc-lsp.vim) registers the server and sets omni completion (`CTRL-X CTRL-O`) for IFC
buffers. Use `:LspHover`, `:LspDefinition`, `:LspReferences` and `:LspDocumentSymbol`.

With [yegappan/lsp](https://github.com/yegappan/lsp) instead, skip `plugin/` and add to your `vimrc`:

```vim
autocmd User LspSetup call LspAddServer([#{name: 'ifc-language-server', filetype: ['ifc'], path: 'ifc-language-server', args: []}])
```

Tested with Vim 9.1.1752 in a terminal and vim-lsp at `977e704`: on a small file, a 13.6 MB file and a 56 MB file,
colouring, diagnostics, hover, go-to-definition, references and outline work; diagnostics refresh about 12 s after an
edit to the 56 MB file. The server only completes the `!ifc` boilerplate, which works. Neither client requests range
semantic tokens, so colouring comes from the syntax file alone. yegappan/lsp was checked on the small file for
diagnostics, hover, go-to-definition and references.
