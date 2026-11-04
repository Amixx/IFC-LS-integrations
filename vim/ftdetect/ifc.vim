" `set filetype` rather than `setf`: Vim's own rules map *.stp to filetype stp.
au BufNewFile,BufRead *.ifc,*.IFC set filetype=ifc
au BufNewFile,BufRead *.stp,*.STP,*.step,*.STEP,*.p21
      \ if getline(1) =~# '^\s*ISO-10303-21\s*;' | set filetype=ifc | endif
