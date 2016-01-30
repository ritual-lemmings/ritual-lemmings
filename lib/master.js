export default class Master {
  constructor(socket) {
    this.socket = socket;

    console.log(`${socket.clientType} (${socket.clientId}) connected.`);

    socket.emit('boot', { clientType: 'master', clientId: socket.clientId });
  }
}
