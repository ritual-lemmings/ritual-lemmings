import { Server } from 'http';
import Koa from 'koa';
import convert from 'koa-convert';
import serve from 'koa-static';
import Socket from 'socket.io';
import jade from 'jade';

import Master from './lib/master';
import Slave from './lib/slave';


const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = jade.renderFile('views/index.jade');
});

app.use(convert(serve(__dirname + '/assets/')));


const server = Server(app.callback());
const io = Socket(server);

let clients = [];

io.on('connection', (socket) => {
  const hasMaster = clients.some((element, index, array) => {
    return element.socket.clientType === 'master';
  });

  socket.clientType = !hasMaster ? 'master' : 'slave';
  socket.clientId = socket.id;
  console.log(hasMaster, socket.clientType, clients.map(element => {
    return element.socket.clientType;
  }));

  let client;
  if (!hasMaster) {
    client = new Master(socket)
    clients.push(client);
  } else {
    client = new Slave(socket);
    clients.push(client);
  }

  socket.on('disconnect', () => {
    clients = clients.filter(element => {
      return element.socket.id !== socket.id;
    });
    console.log(`${socket.clientType} (${socket.id}) disconnected.`);
  });
});

server.listen(3000);
console.log('Server is running on http://127.0.0.1:3000');
