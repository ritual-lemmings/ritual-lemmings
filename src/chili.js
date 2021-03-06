(function() {
  'use strict';

  var Chili = function (game) {
    var min = 1
    var max = 5
    var y = Math.floor(Math.random() * (max - min + 1)) + min;
    y = y * 120;
    Phaser.Sprite.call(this, game, game.width, y, 'chili');
    game.add.existing(this);
    this.lastFrame = new Date().getTime();

    this.game.physics.arcade.enable(this);
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(this.outOfBounds, this);
    this.body.setSize(this.width - 80, this.height, 0, 0);
  }

  Chili.prototype = Object.create(Phaser.Sprite.prototype);
  Chili.prototype.constructor = Chili;

  Chili.prototype.update = function() {
    var now = new Date().getTime();
    var delta = now - this.lastFrame;
    this.lastFrame = now;
    this.position.x -= 200/1000 * delta;
  };

  Chili.prototype.outOfBounds = function() {
    this.destroy();
  };

  module.exports = Chili;

}());
