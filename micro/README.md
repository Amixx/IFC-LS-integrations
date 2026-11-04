# micro

From the root of this repository, copy the syntax file and install the
[lsp](https://github.com/AndCake/micro-plugin-lsp) plugin. Already have a `settings.json`? Then merge the two keys from
[`settings.json`](settings.json) into it instead of copying it.

![micro with colouring and a diagnostic on an IFC file](screenshot.png)

```sh
mkdir -p ~/.config/micro/syntax
cp micro/ifc.yaml ~/.config/micro/syntax/ifc.yaml
micro -plugin install lsp
cp micro/settings.json ~/.config/micro/settings.json
```

The syntax file is derived from the [Neovim syntax file](../neovim/syntax/ifc.vim). It picks `.ifc` files by extension
and other files by an `ISO-10303-21;` first line. `lsp.formatOnSave` is off because the server offers no formatting.

In an IFC file:

- Alt-K shows hover in the status bar.
- Alt-D goes to the definition.
- Alt-R lists references in a split. Enter on a line opens it in a new tab. Ctrl-Q closes the split.
- Ctrl-Space completes.

Diagnostics mark the gutter. Their message shows when the cursor is on them.

Tested with micro 2.0.15 and lsp 0.6.2. On a 25 KB file, colouring, diagnostics, hover, go-to-definition, references
and the `!ifc` boilerplate completion work. Hover arrives as one status-bar line, with the markdown unrendered and cut
at the screen width. The plugin has no outline, semantic tokens, signature help or inlay hints.

The plugin sends the whole document on open and after every edit, as a JSON string built in Lua. micro freezes until
that is done. A 13.6 MB file took four to six minutes to reach the server. After that, hover, go-to-definition and
references answered at once. But a single edit had not reached the server after seven minutes. A 56 MB file did not
reach the server within 11 minutes. Without the plugin, colouring handles the 56 MB file and fills in within about 30
seconds.
