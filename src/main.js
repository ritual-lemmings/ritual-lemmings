require("../node_modules/phaser/dist/pixi.js");
require("../node_modules/phaser/dist/phaser.js");
require('./main.sass');

var Boot = require('./states/boot');
var Preload = require('./states/preload');
var Game = require('./states/game');

//game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'game-container');
//game = new Phaser.Game(1680, 1050, Phaser.AUTO, 'game-container');
var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game-container');
game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('game', Game);

game.state.start('boot');
