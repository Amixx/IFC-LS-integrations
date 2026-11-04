# Sublime Text

Install the [LSP](https://packagecontrol.io/packages/LSP) package through Package Control and copy
[`IFC.sublime-syntax`](IFC.sublime-syntax) into `Packages/User/` (**Preferences > Browse Packages…**):

```sh
cp sublime/IFC.sublime-syntax "<Packages>/User/"
```

Then open **Preferences > Package Settings > LSP > Settings**, merge the `clients.ifc-language-server` entry and
`"semantic_highlighting": true` from [`LSP.sublime-settings`](LSP.sublime-settings) into your settings, and restart.

Tested with build 4215 and the LSP package: colouring, diagnostics, completion and go-to-definition work, and Sublime
requests semantic tokens for the visible range; hover, references and outline are untested. A 56 MB file opened as
Plain Text; choose **View > Syntax > IFC STEP** for it.
