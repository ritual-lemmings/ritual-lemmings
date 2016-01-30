export default class Slave {
  constructor(socket) {
    socket.emit('boot', { type: 'slave' });
  }
}
