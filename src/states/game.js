(function () {
  'use strict';

  var Lake = require('./../obstacles/lake');
  var Rock = require('./../obstacles/rock');
  var Player = require('../player');

  function Game() {
    this.lastFrame = new Date().getTime();
    this.speed = 200;

  }

  Game.prototype = {
    create: function() {
      var self = this;
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.setBoundsToWorld();
      this.time.advancedTiming = true;

      this.sky = this.game.add.tileSprite(0, 0, this.game.width, 240, 'sky');
      this.bgBack = this.game.add.tileSprite(0, 0, this.game.width, 240, 'bg_back');
      this.bgFront = this.game.add.tileSprite(0, 0, this.game.width, 240, 'bg_front');

      this.level = this.game.add.tileSprite(0, this.game.height - 600, this.game.width, 600, 'level');

      this.playerGroup = this.game.add.group();
      this.players = {};
      this.obstacles = this.game.add.group();

      this.spawnObstacle();

      Object.keys(window.clients).forEach(function(e) {
        var p = new Player(self.game, 5*120, Math.random() * 500 + 120, window.clients[e].clientColor)
        self.playerGroup.add(p);
        self.players[e] = p;
      });

      this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
      this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

      socket.on('input', function (data) {
        switch (data.inputData) {
          case "control1Down":
            self.players[data.client].direction = -1;
            break;
          case "control1Up":
            self.players[data.client].direction = 0;
            break;
          case "control2Down":
            self.players[data.client].direction = 1;
            break;
          case "control2Up":
            self.players[data.client].direction = 0;
            break;
          default:
            self.players[data.client].direction = 0;
        }
      });
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
      this.game.physics.arcade.overlap(this.playerGroup, this.obstacles, this.collisionHandler, null, this);
    },
    render: function() {
      this.game.debug.text(this.time.fps || '--', 2, 14, "#00ff00");
      //this.game.debug.body(this.player);
      function renderGroup(member) {
        this.game.debug.body(member);
      }
      this.obstacles.forEachAlive(renderGroup, this);
    },
    spawnObstacle: function() {
      var obs = [Rock, Rock, Rock, Rock, Rock, Rock, Rock, Rock, Rock, Rock, Lake];
      var choice = obs[Math.floor(Math.random() * obs.length)];
      this.obstacles.add(new choice(this.game));
      if (choice === Rock) {
        setTimeout(this.spawnObstacle.bind(this), 1000);
      } else if (choice === Lake) {
        setTimeout(this.spawnObstacle.bind(this), 3000);
      }
    },
    collisionHandler: function(player, obstacle) {
      player.crash(player, obstacle);
    }
  };

  module.exports = Game;

}());
