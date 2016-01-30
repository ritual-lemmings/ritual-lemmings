import clientColors from './colors';

export default class Slave {
  constructor(socket) {
    this.socket = socket;

    console.log(`${socket.clientType} (${socket.clientNumber}) connected.`);

    socket.emit('boot', {
      clientType: 'slave',
      clientNumber: socket.clientNumber,
      clientColor: clientColors[socket.clientNumber - 1], // master got zero, offset of 1
    });
  }
}
