#!/bin/sh

cd node_modules/phaser

npm i
npm i grunt-cli

./node_modules/.bin/grunt custom --exclude p2,creature,ninja --split true
