# IFC / STEP physical file (ISO 10303-21)

hook global BufCreate .*\.(?i)ifc %{
    set-option buffer filetype ifc
}

hook global BufOpenFile .*\.(?i)(?:stp|step|p21) %{
    try %{
        execute-keys -draft 'gkx<a-k>\A\h*ISO-10303-21\h*;<ret>'
        set-option buffer filetype ifc
    }
}

hook global WinSetOption filetype=ifc %{
    require-module ifc
    add-highlighter window/ifc ref ifc
    hook -once -always window WinSetOption filetype=.* %{ remove-highlighter window/ifc }
}

provide-module ifc %§

add-highlighter shared/ifc regions
add-highlighter shared/ifc/code default-region group
add-highlighter shared/ifc/string region "'" "'" group
add-highlighter shared/ifc/binary region '"' '"' fill string
add-highlighter shared/ifc/comment region '/\*' '\*/' fill comment

add-highlighter shared/ifc/string/ fill string
add-highlighter shared/ifc/string/ regex '\\X\\[0-9A-Fa-f]{2}|\\X[24]\\[0-9A-Fa-f]*\\X0\\|\\[SP]\\.|\\\\' 0:meta

add-highlighter shared/ifc/code/ regex '[-+]?\b\d+(?:\.\d*)?(?:[eE][-+]?\d+)?' 0:value
add-highlighter shared/ifc/code/ regex '\b([A-Z][A-Z0-9_]*)\h*\(' 1:type
add-highlighter shared/ifc/code/ regex '=\h*([A-Z][A-Z0-9_]*)' 1:type
add-highlighter shared/ifc/code/ regex '\b(?:FILE_DESCRIPTION|FILE_NAME|FILE_SCHEMA|FILE_POPULATION|SECTION_LANGUAGE|SECTION_CONTEXT|SCHEMA_POPULATION)\b' 0:keyword
add-highlighter shared/ifc/code/ regex '^\h*((?:END-)?ISO-10303-21)\h*;' 1:meta
add-highlighter shared/ifc/code/ regex '^\h*(HEADER|DATA|ENDSEC)\h*[;(]' 1:meta
add-highlighter shared/ifc/code/ regex '#\d+' 0:variable
add-highlighter shared/ifc/code/ regex '\.[A-Z][A-Z0-9_]*\.' 0:value
add-highlighter shared/ifc/code/ regex '[$*]' 0:builtin

§
