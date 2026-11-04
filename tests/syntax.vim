" Usage: vim -Nu NONE -es -S tests/syntax.vim  (from the repository root)
let s:errors = []

function! s:Group(lnum, col) abort
  return synIDattr(synID(a:lnum, a:col, 1), 'name')
endfunction

function! s:Expect(lnum, col, want, what) abort
  let l:got = s:Group(a:lnum, a:col)
  if l:got !=# a:want
    call add(s:errors, printf('%s: line %d col %d is %s, expected %s',
          \ a:what, a:lnum, a:col, string(l:got), string(a:want)))
  endif
endfunction

call setline(1, ["#1=X('',$);", "#2=Y('it''s',$);"])
source neovim/syntax/ifc.vim

call s:Expect(1, 9, 'ifcNull', '$ after an empty string')
call s:Expect(2, 9, 'ifcStringEscape', "'' inside 'it''s'")
call s:Expect(2, 14, 'ifcNull', "$ after 'it''s'")

if empty(s:errors)
  qall!
endif
for s:e in s:errors
  call writefile([s:e], '/dev/stderr', 'a')
endfor
cquit!
