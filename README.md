# IFC-LS-integrations

Editor setups for the [IFC Language Server](https://github.com/NepomukWolf/IFC-Language-Server): syntax files and
language-client configuration for editors that need no extension of their own.

VS Code and Zed have their own extensions: [vscode-ifc](https://github.com/NepomukWolf/vscode-ifc) and
[zed-ifc](https://github.com/Finradon/zed-ifc).

## Setup

1. Download `ifc-language-server` from the language server's
   [Releases](https://github.com/NepomukWolf/IFC-Language-Server/releases) and put it on your `PATH`.
2. Follow your editor's README below.

Files above the server's `astFileSizeLimitMb` (see its
[Configuration](https://github.com/NepomukWolf/IFC-Language-Server#configuration)) get only the features that don't
need the full syntax tree.

## Editors

| Editor | Colouring | Language server |
| ------ | --------- | --------------- |
| [Notepad++](notepad++) | User-defined language | None |
| [JetBrains IDEs](jetbrains) | TextMate bundle | LSP4IJ plugin, without semantic tokens |
| [Sublime Text](sublime) | Syntax definition, semantic tokens | LSP package |
| [Vim](vim) | Syntax file | vim-lsp, without semantic tokens |
| [Neovim](neovim) | Syntax file, semantic tokens | Built-in client |
| [Eclipse IDE](eclipse) | TextMate grammar | LSP4E, without semantic tokens |
| [Emacs](emacs) | Major mode | Eglot, without semantic tokens |
| [Kate](kate) | Syntax definition, semantic tokens | Built-in LSP Client |
| [BBEdit](bbedit) | Codeless language module | Built-in LSP support, licensed or trial |
| [Helix](helix) | tree-sitter, up to about 8 MB | Built-in client |
| [Kakoune](kakoune) | Highlighters | kakoune-lsp, without semantic tokens |

## License

[MIT](LICENSE)
