(function () {
  'use strict';

  var Player = require('../player');

  function End() {
  }

  End.prototype = {
    create: function() {
      var img = document.createElement('img');
      img.src = "assets/end_anim.gif";
      document.body.appendChild(img);
      setTimeout(function() {
        document.body.removeChild(img);
      }, 6000);
      this.jumpSound = this.game.add.audio('end_jump_sound');
      this.jumpSound.play();

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
