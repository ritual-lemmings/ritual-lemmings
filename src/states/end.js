(function () {
  'use strict';

  var Player = require('../player');

  function End() {
  }

  End.prototype = {
    create: function() {
      this.input.onUp.addOnce(this.restart, this);
      this.game.add.sprite(0, 0, 'end');
      new Player(this.game, 883, 325, window.clients[window.winner].clientColor);
      socket.emit('end');
    },
    restart: function() {
      console.log("restart");
      this.game.state.start('menu');
    }
  };

  module.exports = End;

}());
