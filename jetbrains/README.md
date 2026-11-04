# JetBrains IDEs

![IntelliJ IDEA with colouring, inlay hints and a hover on an IFC file](screenshot.png)

You need IntelliJ IDEA 2026.2 or later with Red Hat's [LSP4IJ](https://github.com/redhat-developer/lsp4ij) plugin.
Its free tier is enough.

The TextMate bundle's grammar and language configuration are from
[vscode-ifc](https://github.com/NepomukWolf/vscode-ifc), MIT licence ([`LICENSE`](ifc-textmate/LICENSE)).

With the IDE closed, install LSP4IJ (or install it from **Settings > Plugins**):

```sh
idea installPlugins com.redhat.devtools.lsp4ij
```

Then, in the IDE:

1. **Settings > Editor > TextMate Bundles**, **+**, and choose the [`jetbrains/ifc-textmate`](ifc-textmate) folder of
   this repository. The IDE reads the bundle from there, so keep the folder.
2. **Settings > Languages & Frameworks > Language Servers**, **+**, set **Template** to **Import from custom
   template...**, choose [`jetbrains/lsp4ij-template`](lsp4ij-template), and press **OK**.
3. **Help > Edit Custom Properties**, add the lines below, and restart. Without them, files above 2.5 MB open as plain
   text without colouring. Files above 20 MB don't open in the text editor at all.

   ```properties
   idea.max.intellisense.filesize=200000
   idea.max.content.load.filesize=200000
   ```

4. For files of about 50 MB, raise **Help > Change Memory Settings** to 4096 MB. With the default 2048 MB, the IDE
   runs out of memory on them.

Only `.ifc` files are mapped. `.stp`, `.step` and `.p21` files get neither colouring nor the server.

Find references with **LSP Reference(s)**. It is under **Go To** in the editor's context menu, with its shortcut shown
next to it. The IDE's own **Show Usages** finds nothing.

Semantic colouring isn't available with LSP4IJ, so the template turns it off.

The IDE's spell checker marks entity names as typos. If that gets in the way, turn off **Settings > Editor >
Inspections > Proofreading > Typo**.

These work, also on a 56 MB file:

- colouring
- diagnostics
- hover
- go-to-definition
- references
- outline (**Structure**)
- inlay hints with attribute names
- completion, which the server only offers for the `!ifc` boilerplate

On a 56 MB file, the editor freezes for 10 to 20 seconds when opening it and after edits. Diagnostics take up to a
minute to update.
