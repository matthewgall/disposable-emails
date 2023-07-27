#!/bin/bash

set -e

cat $1 | while read -r line; do
    printf %s "$line" | shasum -a 256 | cut -f1 -d' '
done
