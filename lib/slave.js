import clientColors from './colors';

export default class Slave {
  constructor(socket, io, master) {
    this.socket = socket;

    console.log(`${socket.clientType} (${socket.clientNumber}) connected.`);

    this.boot();

    socket.on('input', data => {
      io.to(master.socket.id).emit('input', { client: socket.clientId, inputData: data });
    });
  }

  boot() {
    this.socket.emit('boot', {
      clientType: 'slave',
      clientId: this.socket.id,
      clientNumber: this.socket.clientNumber,
      clientColor: clientColors[this.socket.clientNumber - 1], // master got zero, offset of 1
    });
  }
}
