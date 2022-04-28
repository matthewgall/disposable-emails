#!/bin/bash

sources=(https://raw.githubusercontent.com/disposable/disposable-email-domains/master/domains.txt
https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf )

for i in "${sources[@]}"
do
  curl -s "$i"
done
