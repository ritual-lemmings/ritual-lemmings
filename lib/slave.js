export default class Slave {
  constructor(socket) {
    this.socket = socket;

    console.log(`${socket.clientType} (${socket.clientId}) connected.`);

    socket.emit('boot', { clientType: 'slave', clientId: socket.clientId });
  }
}
