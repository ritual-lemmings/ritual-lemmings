require('./main.sass');

window.bootGame = function() {
  require("../node_modules/phaser/dist/pixi.js");
  require("../node_modules/phaser/dist/phaser.js");

  window.clients = {};

  var Boot = require('./states/boot');
  var Preload = require('./states/preload');
  var Menu = require('./states/menu');
  var Game = require('./states/game');
  var End = require('./states/end');

  var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game-container');
  game.state.add('boot', Boot);
  game.state.add('preload', Preload);
  game.state.add('menu', Menu);
  game.state.add('game', Game);
  game.state.add('end', End);

  game.state.start('boot');
};
