import { Server } from 'http';
import Koa from 'koa';
import cache from 'koa-cache-control';
import compress from 'koa-compress';
import route from 'koa-route';
import mount from 'koa-mount';
import convert from 'koa-convert';
import serve from 'koa-static';
import Socket from 'socket.io';
import jade from 'jade';

import Master from './lib/master';
import Slave from './lib/slave';


const app = new Koa();

app.use(convert(compress()));
app.use(convert(cache({
  maxAge: 60,
})));

// app.use(convert(mount('/src', serve(__dirname))));

// serve asset files
app.use(convert(mount('/assets', serve(__dirname + '/assets'))));
// node modules expose for client, has to work without building client for now
app.use(convert(mount('/modules', serve(__dirname + '/node_modules'))));
// serve public folder on root url
app.use(convert(serve(__dirname + '/public')));


const server = Server(app.callback());
const io = Socket(server);

let clients = [];

function selectClientNumber(socket, clients) {
  if (socket.clientType === 'master') {
    return 0;
  }

  const takenNumbers = clients.map(element => {
    return element.socket.clientNumber;
  });

  for (let number = 1; number <= clients.length; number++) {
    if (!takenNumbers.includes(number)) {
      return number;
    }
  }
  return clients.length + 1;
}

io.on('connection', (socket) => {
  function getMaster() {
    const masterArray = clients.filter(element => {
      return element.socket.clientType === 'master';
    });
    if (masterArray.length > 0) {
      return masterArray[0];
    }
  }
  const hasMaster = clients.some((element, index, array) => {
    return element.socket.clientType === 'master';
  });

  socket.clientType = !hasMaster ? 'master' : 'slave';
  socket.clientId = socket.id;
  socket.clientNumber = selectClientNumber(socket, clients);

  let client;
  if (!hasMaster) {
    client = new Master(socket)
    clients.push(client);
  } else {
    client = new Slave(socket, io, getMaster());
    clients.push(client);
  }

  socket.on('disconnect', () => {
    clients = clients.filter(element => {
      return element.socket.id !== socket.id;
    });
    console.log(`${socket.clientType} (${socket.clientNumber}) disconnected.`);
  });
});

server.listen(3000, '0.0.0.0');
console.log('Server is running on http://127.0.0.1:3000');
