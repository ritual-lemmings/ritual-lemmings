(function () {
  'use strict';

  var Rock = require('./../obstacles/rock');
  var Player = require('../player');

  function Game() {
    this.lastFrame = new Date().getTime();
    this.speed = 200;

  }

  Game.prototype = {
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.setBoundsToWorld();
      this.time.advancedTiming = true;

      this.sky = this.game.add.tileSprite(0, 0, this.game.width, 240, 'sky');
      this.bgBack = this.game.add.tileSprite(0, 0, this.game.width, 240, 'bg_back');
      this.bgFront = this.game.add.tileSprite(0, 0, this.game.width, 240, 'bg_front');

      this.level = this.game.add.tileSprite(0, this.game.height - 600, this.game.width, 600, 'level');

      this.players = this.game.add.group();
      this.obstacles = this.game.add.group();


      setInterval(this.spawnRock.bind(this), 1000);

      this.player = new Player(this.game, 300);
      this.players.add(this.player);

      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },
    update: function() {
      var now = new Date().getTime();
      var delta = now - this.lastFrame;
      this.lastFrame = now;
      this.level.tilePosition.x -= this.speed/1000 * delta;
      this.bgBack.tilePosition.x -= (this.speed * 0.2)/1000 * delta;
      this.bgFront.tilePosition.x -= (this.speed * 0.3)/1000 * delta;

      if (this.upKey.isDown) {
        this.player.up(delta)
      }
      if (this.downKey.isDown) {
        this.player.down(delta)
      }
      this.game.physics.arcade.overlap(this.players, this.obstacles, this.collisionHandler, null, this);
    },
    render: function() {
      this.game.debug.text(this.time.fps || '--', 2, 14, "#00ff00");
      this.game.debug.body(this.player);
    },
    spawnRock: function() {
      this.obstacles.add(new Rock(this.game));
    },
    collisionHandler: function(player, obstacle) {
      console.log("boom");
      player.crash();
    }
  };

  module.exports = Game;

}());
