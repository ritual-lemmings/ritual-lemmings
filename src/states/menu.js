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
    },

    onConnect: function(data) {
      console.log("client joined", data);
      data.clientColor = data.clientColor.replace('#','');
      if (!window.clients[data.clientId]) {
        window.clients[data.clientId] = data;
        this.players[data.clientId] = new Player(this.game, Object.keys(window.clients).length * 120, 500, data.clientColor);
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
