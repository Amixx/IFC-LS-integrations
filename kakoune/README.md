# Kakoune

![Kakoune with colouring and a hover on a #id reference in an IFC file](screenshot.png)

Colouring comes from Kakoune highlighters in [`ifc.kak`](ifc.kak). [`ifc-lsp.kak`](ifc-lsp.kak) connects the server
through [kakoune-lsp](https://github.com/kakoune-lsp/kakoune-lsp).

Install Kakoune from your distribution's package. Get kakoune-lsp from its
[releases](https://github.com/kakoune-lsp/kakoune-lsp/releases) or with `cargo install --locked kak-lsp`. On macOS,
use Homebrew:

```sh
brew install kakoune kakoune-lsp/kakoune-lsp/kakoune-lsp
```

From the root of this repository, copy the files into your config:

```sh
mkdir -p ~/.config/kak
cp kakoune/ifc.kak kakoune/ifc-lsp.kak ~/.config/kak/
```

Then add to `~/.config/kak/kakrc`:

```kak
eval %sh{kak-lsp}
source "%val{config}/ifc.kak"
source "%val{config}/ifc-lsp.kak"
lsp-enable
```

`.ifc` files are detected by name. `.stp`, `.step` and `.p21` files are detected only when their first line is
`ISO-10303-21;`.

Leave `lsp_debug` off on large files. With it on, an edit freezes Kakoune.

These work:

- colouring
- diagnostics
- hover
- go-to-definition (`lsp-definition`)
- references
- outline (`lsp-document-symbol`)
- completion of the `!ifc` boilerplate

A 56 MB file opens at once with the same features. Diagnostics arrive about 30 seconds after an edit.

There is no semantic colouring.
