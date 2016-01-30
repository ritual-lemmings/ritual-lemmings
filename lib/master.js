export default class Master {
  constructor(socket) {
    socket.emit('boot', { type: 'master' });
  }
}
