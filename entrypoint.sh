#!/bin/bash

# Create a node config json file
cd /opt/adaptor
touch node.json
echo "{

    \"host\": \"$HOST\",

    \"port\": $PORT

}" > node.json

# Run the adaptor
node index.js
