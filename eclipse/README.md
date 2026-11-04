# Eclipse IDE

![Eclipse IDE with colouring, inlay hints and a hover on an IFC file](screenshot.png)

Eclipse runs the server through [LSP4E](https://github.com/eclipse-lsp4e/lsp4e) in the Generic Editor and colours files
with [TM4E](https://github.com/eclipse-tm4e/tm4e), both bundled with the Eclipse IDE for Java Developers. The grammar
is [vscode-ifc](https://github.com/NepomukWolf/vscode-ifc)'s `syntaxes/ifc.tmLanguage.json` with `"fileTypes": ["ifc"]`
added, which TM4E uses to match `.ifc` files. With Eclipse closed, copy the grammar and the launch configuration into
place from the root of this repository (the second path is your workspace, `~/eclipse-workspace` by default):

```sh
mkdir -p ~/.eclipse/ifc ~/eclipse-workspace/.metadata/.plugins/org.eclipse.debug.core/.launches
cp eclipse/ifc.tmLanguage.json ~/.eclipse/ifc/
cp "eclipse/IFC Language Server.launch" ~/eclipse-workspace/.metadata/.plugins/org.eclipse.debug.core/.launches/
```

Then start Eclipse and, in **Window > Preferences** (**Eclipse > Settings…** on macOS):

1. **General > Content Types**: select **Text**, click **Add Child…**, name it `IFC STEP`, then add `*.ifc` under
   **File associations**.
2. **TextMate > Grammar**: click **Add…**, enter the full path of `~/.eclipse/ifc/ifc.tmLanguage.json` (for example
   `/home/you/.eclipse/ifc/ifc.tmLanguage.json`), and click **Finish**.
3. **Language Servers**: click **Add…**, choose **Text > IFC STEP** on the left and **Program > IFC Language Server** on
   the right, and click **OK**.

Open IFC files with **File > Open File…**. The launch configuration finds `ifc-language-server` on Eclipse's `PATH`;
if Eclipse doesn't inherit your shell's `PATH`, set the full path under **Run > External Tools > External Tools
Configurations… > IFC Language Server > Location**. It sends the server's protocol output to `/dev/null`, because
otherwise the Console fills with it and comes to the front on every message. On Windows, change that to `NUL` on the
**Common** tab.

Tested with Eclipse IDE 2026-09 (LSP4E 0.19.15, TM4E 0.18) on Linux aarch64. On a 10 KB file, colouring, diagnostics,
hover, go-to-definition (F3), references (Shift+Ctrl+G), document highlight, inlay hints, outline and the `!`
scaffold completion work. Files of 2.3 MB and 8.8 MB settle within 30 seconds. Files with very long lines lock the UI:
LSP4E requests inlay hints for the whole document and has no setting to turn them off, and once inlay hints arrive,
SWT lays out every line. `Ifc4_Revit_ARC.ifc` (13.6 MB, with a 1 MB line) shows colouring, outline and hover, then
freezes. A 56 MB file gets colouring, but its outline never arrives. Eclipse doesn't use the server's semantic tokens,
because LSP4E requests only full-document tokens. Signature help, macOS and Windows are untested.
