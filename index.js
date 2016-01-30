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

io.on('connection', (socket) => {
  socket.isFirst = io.engine.clientsCount === 1;
  if (socket.isFirst) {
    new Master(socket);
  } else {
    new Slave(socket);
  }
  socket.on('nachricht', (data) => {
    console.log('nachricht', data);
  });
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(3000);
console.log('Server is running on http://127.0.0.1:3000');
