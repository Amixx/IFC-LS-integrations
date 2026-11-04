# Sublime Text

Install the [LSP](https://packagecontrol.io/packages/LSP) package through Package Control and copy
[`IFC.sublime-syntax`](IFC.sublime-syntax) into `Packages/User/` (**Preferences > Browse Packages…**):

```sh
cp sublime/IFC.sublime-syntax "<Packages>/User/"
```

Then open **Preferences > Package Settings > LSP > Settings**. From [`LSP.sublime-settings`](LSP.sublime-settings),
merge the `clients.ifc-language-server` entry and `"semantic_highlighting": true` into your settings. Restart Sublime.

Tested with build 4215 and the LSP package. Colouring, diagnostics, completion and go-to-definition work. Sublime
requests semantic tokens for the visible range. Hover, references and outline are untested.

A 56 MB file opened as Plain Text. Choose **View > Syntax > IFC STEP** for it.
