# ritual-lemmings

A multiplayer game designed for up to 8 persons playing together on one screen in the living room with their own mobile phone.

![Game still](http://globalgamejam.org/sites/default/files/styles/game_content__wide_2x/public/games/screenshots/screenshot_72.jpg?itok=kRJ3vYwO)

Yes, really in the same physical place. No, no need for controllers. Plain simple sidescroller meant to be played together.

A project for the global game jam 2016, built with love in Munich (WERK1), http://globalgamejam.org/2016/games/ritualemmings.

Special thanks to all the people involved in organizing or sponsoring this awesome event, thanks!

## Description

In this multiplayer experience, our cute little lemmings are having their ritualrace to the volcano. The player controls his lemming with his smartphone through swiping. Be faster than your friends to become the honorable lemming to die first in the volcano.

## Technology

Web! phaser.io, node.js, websockets

## Build and setup instructions

1) Install a up to date node.js version (we used 5.x), follow instructions on https://nodejs.org/en/download/.

2) Download the projects source code:

[https://github.com/ritual-lemmings/ritual-lemmings/archive/master.zip](https://github.com/ritual-lemmings/ritual-lemmings/archive/master.zip)
    
Or via `git` for our developers:

    git clone git@github.com:ritual-lemmings/ritual-lemmings

3) Install dependencies via npm:

    npm install
    
If `node-canvas` build should fail have a look at the [install instructions](https://github.com/Automattic/node-canvas#installation).

4) Build phaser (sadly required, but we tried to provide a script, sorry windows):

    sh ./tools/build-phaser.sh

5) Build the game

    npm run build

6) Start the server

    npm start

7) Open game in your webbrowser, first who connects will be master (the one for the big tv aka display only):

    open 127.0.0.1:3000
    
You should rather use your local network IP address instead. Because the QR code for clients to connect is generated based on the url you used to access the server (and they won't find you on localhost).
