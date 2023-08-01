#!/bin/bash
set -eu

# Now into our sources
sources=(https://raw.githubusercontent.com/disposable/disposable-email-domains/master/domains.txt https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf https://raw.githubusercontent.com/MattKetmo/EmailChecker/master/res/throwaway_domains.txt https://raw.githubusercontent.com/FGRibreau/mailchecker/master/list.txt https://www.stopforumspam.com/downloads/toxic_domains_whole.txt https://disify.com/blacklist/domains)

for i in "${sources[@]}"
do
  curl -s "$i"
done

# Now for misp-warninglists
sources=(https://raw.githubusercontent.com/MISP/misp-warninglists/main/lists/disposable-email/list.json)
for i in "${sources[@]}"
do
  curl -s "$i" | $jq -r '.list[]'
done

# Now for more sources that need more processing
sources=(https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/index.json https://raw.githubusercontent.com/ivolo/disposable-email-domains/master/wildcard.json )

for i in "${sources[@]}"
do
  curl -s "$i" | $jq -r '.[]'
done

# And finally the manual blocklist
printf "\n"
while IFS="" read -r p || [ -n "$p" ]
do
    echo $p
done < blocklist.txt
