# Emacs

![Emacs with colouring and an Eglot hover on an IFC file](screenshot.png)

Emacs 29 or later (tested with Emacs 31.1 and its built-in Eglot). Put [`ifc-mode.el`](ifc-mode.el) in a directory on
your `load-path` and add to `init.el`:

```elisp
(require 'ifc-mode)
(with-eval-after-load 'eglot
  (add-to-list 'eglot-server-programs
               '(ifc-mode . ("ifc-language-server"
                             :initializationOptions (:semanticTokensEnabled :json-false)))))
(add-hook 'ifc-mode-hook #'eglot-ensure)
```

Colouring, diagnostics, hover, go-to-definition, references and completion work on files of at least 56 MB. Eglot only
requests full-document semantic tokens, which the server does not provide, so the snippet turns them off. The outline
(`imenu`) takes seconds on a 13.6 MB file and minutes on a 56 MB one, as Eglot locates each symbol by counting lines
from the top of the buffer. Emacs asks for confirmation before opening files above `large-file-warning-threshold`
(10 MB by default).
