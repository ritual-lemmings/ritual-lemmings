export default class Master {
  constructor(socket) {
    console.log(`${socket.clientType} (${socket.clientId}) connected.`);

    socket.emit('boot', { clientType: 'master', clientId: socket.clientId });
  }
}
