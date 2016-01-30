import { Server } from 'http';
import Koa from 'koa';
import Socket from 'socket.io';
import jade from 'jade';


const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = jade.renderFile('views/index.jade');
});


const server = Server(app.callback());
const io = Socket(server);

io.on('connection', (socket) => {
  console.log('client connected');
  socket.on('nachricht', (data) => {
    console.log('nachricht', data);
  });
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
  socket.emit('nachricht', { hello: 'lemming' });
});

server.listen(3000);
