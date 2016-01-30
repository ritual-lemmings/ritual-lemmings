export default class Master {
  constructor(socket) {
    this.socket = socket;

    console.log(`${socket.clientType} (${socket.clientNumber}) connected.`);

    socket.emit('boot', { clientType: 'master', clientNumber: socket.clientNumber });

    socket.on('start', (data) => {
      console.log(`${socket.clientType} (${socket.clientNumber}) starts game.`);
      socket.broadcast.emit('start');
    });
  }
}
