(function() {
  'use strict';

  var Tree2 = function (game) {
    var min = 1
    var max = 5
    var y = Math.floor(Math.random() * (max - min + 1)) + min;
    y = y * 120;
    Phaser.Sprite.call(this, game, game.width, y, 'tree2');
    game.add.existing(this);
    this.lastFrame = new Date().getTime();

    this.game.physics.arcade.enable(this);
    this.physicsBodyType = Phaser.Physics.ARCADE;
    this.checkWorldBounds = true;
    this.events.onOutOfBounds.add(this.outOfBounds, this);
    this.body.setSize(50, 70, 50, 170);
  }

  Tree2.prototype = Object.create(Phaser.Sprite.prototype);
  Tree2.prototype.constructor = Tree2;

  Tree2.prototype.update = function() {
    var now = new Date().getTime();
    var delta = now - this.lastFrame;
    this.lastFrame = now;
    this.position.x -= 200/1000 * delta;
  };

  Tree2.prototype.outOfBounds = function() {
    this.destroy();
  };

  module.exports = Tree2;

}());
