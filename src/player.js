(function() {
  'use strict';

  var Player = function (game, obstacles, y) {
      Phaser.Sprite.call(this, game, 0, y, 'player_body');
      game.add.existing(this);

      this.animations.add('walk');
      this.animations.play('walk', 8, true);
      this.tint = Math.random() * 0xffffff;
      this.game.physics.arcade.enable(this);
      this.physicsBodyType = Phaser.Physics.ARCADE;
      this.checkWorldBounds = true;
      this.body.setSize(60, 60, 20, 60);
      this.playerMask = this.game.add.sprite(0, 0, 'player_mask');
      this.playerMask.animations.add('walk');
      this.playerMask.animations.play('walk', 8, true);

      this.addChild(this.playerMask);
  }

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.up = function (delta) {
    this.y -= 150/1000 * delta;
    if (this.y < 120) {
      this.y = 120;
    }
  }

  Player.prototype.down = function (delta) {
    this.y += 150/1000 * delta;
    if (this.y > this.game.height-120) {
      this.y = this.game.height-120;
    }
  }

  Player.prototype.crash = function () {
    this.tint = 0xFF0000;
  }

  module.exports = Player;

})();
