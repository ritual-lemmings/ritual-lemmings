(function () {
  'use strict';

  var Player = require('../player');

  function Menu() {
    this.players = {};
  }

  Menu.prototype = {
    create: function() {
      this.input.onUp.addOnce(this.start, this);
      socket.on('playerConnect', this.onConnect.bind(this));
      socket.on('playerDisconnect', this.onDisconnect.bind(this));
      this.game.add.sprite(0, 0, 'title');

      this.joinSound = this.game.add.audio('jump_sound');
    },

    onConnect: function(data) {
      console.log("client joined", data);
      data.clientColor = data.clientColor.replace('#','');
      if (!window.clients[data.clientId]) {
        window.clients[data.clientId] = data;
        this.players[data.clientId] = new Player(this.game, Object.keys(window.clients).length * 120 + 300, 570, data.clientColor);
        this.joinSound.play();
      }
    },
    onDisconnect: function(data) {
      console.log("client left", data);
      this.players[data.clientId].kill()
      delete this.players[data.clientId];
      delete window.clients[data.clientId];
    },
    start: function() {
      socket.emit('start');
      this.game.state.start('game');
    }
  };

  module.exports = Menu;

}());
