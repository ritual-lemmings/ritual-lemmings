export default class Master {
  constructor(socket) {
    this.socket = socket;

    console.log(`${socket.clientType} (${socket.clientNumber}) connected.`);

    this.boot();

    socket.on('start', (data) => {
      console.log(`${socket.clientType} (${socket.clientNumber}) starts game.`);
      socket.broadcast.emit('start');
    });

    socket.on('end', (data) => {
      console.log(`${socket.clientType} (${socket.clientNumber}) ends game.`);

      // FIXME: who won the game? maybe send him or her the win flag with true
      socket.broadcast.emit('end', { win: false});
    });
  }

  boot() {
    this.socket.emit('boot', {
      clientType: 'master',
      clientNumber: this.socket.clientNumber,
    });
  }
}
