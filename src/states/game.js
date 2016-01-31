(function () {
  'use strict';

  var Chili = require('./../chili');
  var Lake = require('./../obstacles/lake');
  var Rock = require('./../obstacles/rock');
  var Tree1 = require('./../obstacles/tree1');
  var Tree2 = require('./../obstacles/tree2');
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

      this.music = this.game.add.audio('music');
      this.music.loop = true;
      this.music.play();

      this.chiliSound = this.game.add.audio('chili_sound');

      this.sky = this.game.add.tileSprite(0, 0, this.game.width, 240, 'sky');
      this.bgBack = this.game.add.tileSprite(0, 0, this.game.width, 240, 'bg_back');
      this.bgFront = this.game.add.tileSprite(0, 0, this.game.width, 240, 'bg_front');

      this.level = this.game.add.tileSprite(0, this.game.height - 600, this.game.width, 600, 'level');

      this.playerGroup = this.game.add.group();
      this.players = {};
      this.obstacles = this.game.add.group();
      this.chilis = this.game.add.group();

      this.spawnObstacle();
      this.spawnChili();

      Object.keys(window.clients).forEach(function(e) {
        var p = new Player(self.game, 0, Math.random() * 500 + 120, window.clients[e].clientColor, window.clients[e].clientId);
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
      this.game.physics.arcade.overlap(this.playerGroup, this.obstacles, this.obstacleCollisionHandler, null, this);
      this.game.physics.arcade.overlap(this.playerGroup, this.chilis, this.chiliCollisionHandler, null, this);
    },
    /*
    render: function() {
      this.game.debug.text(this.time.fps || '--', 2, 14, "#00ff00");
      function renderGroup(member) {
        this.game.debug.body(member);
      }
      this.obstacles.forEachAlive(renderGroup, this);
    },
    */
    spawnChili: function() {
      this.chilis.add(new Chili(this.game));
      setTimeout(this.spawnChili.bind(this), Math.random() * 2000 + 500);
    },
    spawnObstacle: function() {
      var obs = [Rock, Rock, Tree1, Rock, Rock, Tree2, Rock, Tree2, Rock, Rock, Lake, Tree1, Tree2, Tree1];
      var choice = obs[Math.floor(Math.random() * obs.length)];
      this.obstacles.add(new choice(this.game));
      if (choice === Rock) {
        setTimeout(this.spawnObstacle.bind(this), 1000);
      } else if (choice === Lake) {
        setTimeout(this.spawnObstacle.bind(this), 3000);
      } else if (choice === Tree1) {
        setTimeout(this.spawnObstacle.bind(this), 1500);
      } else if (choice === Tree2) {
        setTimeout(this.spawnObstacle.bind(this), 1500);
      }
    },
    obstacleCollisionHandler: function(player, obstacle) {
      player.crash(player, obstacle);
    },
    chiliCollisionHandler: function(player, obstacle) {
      player.chili(player, obstacle);
      this.chiliSound.play();
    }
  };

  module.exports = Game;

}());
