#!/bin/bash

# First, we remove any domain in the Tranco 100k
curl -Ls https://tranco-list.eu/download/X5XLN/100000 | cut -d ',' -f 2 | sort | uniq > /tmp/tranco.txt
grep -Fvxf /tmp/tranco.txt public/list.txt > /tmp/list.txt
mv /tmp/list.txt public/list.txt
rm /tmp/tranco.txt

# Now, we process some allowlists
allowlists=(https://raw.githubusercontent.com/disposable/disposable/master/whitelist.txt)
for i in "${allowlists[@]}"
do
    id=$(date +%s | sha256sum | base64 | head -c 12)
    curl -s "$i" -o /tmp/$id.txt
    grep -Fvxf /tmp/$id.txt public/list.txt > /tmp/list.txt
    mv /tmp/list.txt public/list.txt
    rm /tmp/$id.txt
done

# And remove manually allowed domains
while IFS="" read -r p || [ -n "$p" ]
do
    sed -i "/$p/d" public/list.txt
done < allowlist.txt
