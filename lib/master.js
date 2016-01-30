export default class Master {
  constructor(socket) {
    console.log('master connected');
    socket.emit('boot', { type: 'master' });
  }
}
