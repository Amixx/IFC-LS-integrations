#!/bin/sh
set -e
cd "$(dirname "$0")/.."
vim -Nu NONE -es -S tests/syntax.vim
echo "syntax tests passed"
