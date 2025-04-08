#!/bin/bash

npm install

# If DOCKER_PROJECT_INSTALLED env variable is set to "true", call "dev:ssl" otherwise "dev" script
if [ "$DOCKER_PROJECT_INSTALLED" = "true" ]; then
  npm run dev:ssl
else
  npm run dev
fi
