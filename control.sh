#!/bin/bash

# app version
version="1.0.0"
app="cell-render"

echo "hello"

function build() {
  echo ">> The current version of $app is $version\n"
  cp index.js npm/index.js
  cp index.d.ts npm/index.d.ts
}


if [ "$1" == "" ]; then
  help
elif [ "$1" == "build" ]; then
  build
else
  help
fi