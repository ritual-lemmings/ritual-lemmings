export default class Logger {
  log(socket, msg) {
    let sender = socket.clientType;
    if (socket.clientType === 'slave') {
      sender += `(${socket.clientId})`;
    }
    sender += ':';
    console.log(sender, msg);
  }
}
