#!/bin/bash

cat public/list.txt | sed 's/"/\\"/;s/.*/"&",/;1s/^/[/;$s/,$/]/'