#!/bin/bash

echo -e "---\ndomains:"
cat public/list.txt | sed 's/^/  - \"/g' | sed 's/$/\"/g'
