import { Server } from 'http';
import Koa from 'koa';
import Socket from 'socket.io';

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = 'hello lemming!';
});


const server = Server(app.callback());
const io = Socket(server);

io.on('connection', (socket) => {
  socket.emit('ping', { hello: 'lemming' });
  socket.on('pong', (data) => {
    console.log('pong', data);
  });
});

server.listen(3000);
