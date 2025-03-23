#! /bin/bash

curl -X POST http://localhost:3000/ \
     -H "Content-Type: application/json" \
     -d @invalidData.json \
     --verbose \
     | jq


