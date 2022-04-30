#!/bin/bash

sources=(https://raw.githubusercontent.com/disposable/disposable-email-domains/master/domains.txt
https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf )

for i in "${sources[@]}"
do
  curl -s "$i"
done

# Now for more sources that need more processing
sources=(https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/index.json
https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/wildcard.json )

for i in "${sources[@]}"
do
  curl -s "$i" | cut -d '"' -f 2 | sed 's/\[//g' | sed 's/\]//g' | sed '/^$/d'
done
