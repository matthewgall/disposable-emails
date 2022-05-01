#!/bin/bash

if [ -f public/list.txt ]; then
    echo -e "---\ndomains:"
    cat public/list.txt | sed 's/^/  - \"/g' | sed 's/$/\"/g'
else
    echo "public/list.txt does not exist. Aborting."
fi