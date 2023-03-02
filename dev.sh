#!/bin/bash

# options
function usage() {
  echo -e "Usage: $0 [-i] [-h]
    -i: install npm libraries
    -h: show usage" 1>&2;
  exit 0;
}

installNodeModules=0
while getopts "pikuh" o; do
  case "${o}" in
    i)
      installNodeModules=1
      ;;
    h | *)
      usage
      ;;
  esac
done

nvm use

if [[ $installNodeModules == 1 ]]; then
  npm install
fi

npm run dev
