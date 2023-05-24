#!/bin/bash

# First, we remove any domain in the Tranco 10k
curl -Ls https://tranco-list.eu/download/X5XLN/10000 | cut -d ',' -f 2 | sort | uniq > /tmp/tranco.txt
grep -Fvxf /tmp/tranco.txt public/list.txt > /tmp/list.txt
mv /tmp/list.txt public/list.txt
rm /tmp/tranco.txt

# And remove manually blocked domains
while IFS="" read -r p || [ -n "$p" ]
do
    sed -i "/$p/d" public/list.txt
done < blocklist.txt
