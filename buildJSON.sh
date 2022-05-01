#!/bin/bash

if [ -f public/list.txt ]; then
    cat public/list.txt | sed 's/"/\\"/;s/.*/"&",/;1s/^/[/;$s/,$/]/'
else
    echo "public/list.txt does not exist. Aborting."
fi