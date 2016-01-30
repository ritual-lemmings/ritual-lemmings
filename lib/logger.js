export default class Logger {
  log(socket, msg) {
    console.log(socket.clientType + ':', msg);
  }
}
