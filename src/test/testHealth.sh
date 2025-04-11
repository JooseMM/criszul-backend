#! /bin/bash

curl -X POST http://localhost:3000/health \
     -H "Content-Type: application/json" \
     --verbose \
     | jq


