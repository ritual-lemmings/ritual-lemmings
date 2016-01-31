(function() {
  'use strict';

  var Player = function (game, x, y, color) {
      Phaser.Sprite.call(this, game, x, y, 'player_body');
      game.add.existing(this);
      this.lastFrame = new Date().getTime();
      this.direction = 0;

      this.animations.add('walk');
      this.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7]);
      this.animations.add('crash', [8, 9, 10, 11, 12, 13, 14, 15]);
      this.animations.play('walk', 8, true);
      this.tint = parseInt(color, 16);
      this.game.physics.arcade.enable(this);
      this.physicsBodyType = Phaser.Physics.ARCADE;
      this.checkWorldBounds = true;
      this.body.setSize(60, 60, 20, 60);

      this.playerMask = this.game.add.sprite(0, 0, 'player_mask');
      this.playerMask.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7]);
      this.playerMask.animations.add('crash', [8, 9, 10, 11, 12, 13, 14, 15]);
      this.playerMask.animations.play('walk', 8, true);

      this.addChild(this.playerMask);

      this.emitter = this.game.add.emitter(60, 60, 100);
      this.emitter.makeParticles('pow');
      this.emitter.setScale(0, 1, 0, 1, 1000, Phaser.Easing.Quintic.Out);

      this.crashed = false;
  };

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.up = function (delta) {
    this.y -= 150/1000 * delta;
    if (this.y < 120) {
      this.y = 120;
    }
  };

  Player.prototype.down = function (delta) {
    this.y += 150/1000 * delta;
    if (this.y > this.game.height-120) {
      this.y = this.game.height-120;
    }
  }

  Player.prototype.update = function() {
    var now = new Date().getTime();
    var delta = now - this.lastFrame;
    this.lastFrame = now;

    this.y += 150/1000 * this.direction * delta;

    if (this.y > this.game.height-120) {
      this.y = this.game.height-120;
    }
    if (this.y < 120) {
      this.y = 120;
    }
  };

  Player.prototype.crash = function (self, other) {
    if (this.lastCrash !== other) {
      this.emitter.x = this.position.x;
      this.emitter.y = this.position.y;
      this.emitter.gravity = 0;
      this.emitter.start(true, 1000, null, 1);

      this.animations.play('crash', 8);
      this.playerMask.animations.play('crash', 8);
      this.animations.currentAnim.onComplete.add(function () {
        this.animations.play('walk', 8, true);
        this.playerMask.animations.play('walk', 8, true);
      }, this);
      this.game.add.tween(this).to( { x: this.position.x -120 }, 500, Phaser.Easing.Cubic.Out, true);
    }
    this.lastCrash = other;
  };

  module.exports = Player;

})();
