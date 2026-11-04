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
| [Neovim](neovim) | Syntax file, semantic tokens | Built-in client |

## License

[MIT](LICENSE)
