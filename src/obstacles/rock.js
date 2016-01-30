(function() {
  'use strict';

  var Rock = function (game) {
    var y = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
    y = y * 120;
    Phaser.Sprite.call(this, game, game.width, y, 'rock');
    game.add.existing(this);
    this.lastFrame = new Date().getTime();

    this.game.physics.arcade.enable(this);
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(this.outOfBounds, this);
  }

  Rock.prototype = Object.create(Phaser.Sprite.prototype);
  Rock.prototype.constructor = Rock;

  Rock.prototype.update = function() {
    var now = new Date().getTime();
    var delta = now - this.lastFrame;
    this.lastFrame = now;
    this.position.x -= 200/1000 * delta;
  };

  Rock.prototype.outOfBounds = function() {
    this.destroy();
  };

  module.exports = Rock;

}());
