export default class Slave {
  constructor(socket) {
    console.log('client connected');
    socket.emit('boot', { type: 'slave' });
  }
}
