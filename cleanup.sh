#!/bin/bash

while IFS="" read -r p || [ -n "$p" ]
do
    sed -i "/$p/d" public/list.txt
done < blocklist.txt