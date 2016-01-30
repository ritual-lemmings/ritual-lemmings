export default class Master {
  constructor(socket) {
    console.log(`${socket.clientType} (${socket.clientId}) connected.`);

    socket.emit('boot', { type: 'master' });
  }
}
