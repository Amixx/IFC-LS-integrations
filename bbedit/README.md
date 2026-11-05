# BBEdit

![BBEdit with colouring and a language-server diagnostic on an IFC file](screenshot.png)

[`IFC.plist`](IFC.plist) is a codeless language module. It also starts the language server through BBEdit's built-in
LSP support. From the root of this repository, copy it into place and restart BBEdit:

```sh
mkdir -p ~/Library/Application\ Support/BBEdit/Language\ Modules
cp bbedit/IFC.plist ~/Library/Application\ Support/BBEdit/Language\ Modules/
```

BBEdit finds `ifc-language-server` on your login shell's `PATH`. BBEdit's language-server support needs a licence or the trial.
BBEdit's free mode keeps the colouring but has no LSP support.

Diagnostics work, with errors underlined and counted in the navigation bar. BBEdit shows no outline and no
semantic colouring.
