export default class Slave {
  constructor(socket) {
    console.log(`${socket.clientType} (${socket.clientId}) connected.`);

    socket.emit('boot', { type: 'slave' });
  }
}
