#!/bin/bash

rm .env 2> /dev/null
touch .env

echo 'PORT=80' > .env
echo 'MONGO_ADDRESS="mongodb"' >> .env
echo "SESSION_KEY='$(./randomString.sh)'" >> .env
echo "SESSION_SECRET='$(./randomString.sh)'" >> .env
