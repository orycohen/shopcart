#!/bin/bash

# Random string generator for session keys
LC_ALL=C tr -dc 'A-Za-z0-9!"#$%&()*+,-./:;<=>?@[\]^_`{|}~' </dev/urandom | head -c 40 ; echo
