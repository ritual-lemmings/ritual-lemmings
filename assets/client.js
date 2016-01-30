var socket = io();

socket.on('boot', function (data) {
  console.log('I am', data.clientType);

  if (data.clientType === 'master') {
    bootMaster(data);
  } else {
    bootSlave(data);
  }
});

function bootMaster(data) {
  socket.on('input', function (data) {
    console.log('input', data);
  });
}

function bootSlave(data) {
  console.log('My color is', data.clientColor);

  socket.on('game', function (data) {
    console.log('game', data);
  });
}


function meep() {
  console.log('sending meep...');
  socket.emit('nachricht', { data: 'meep' });
}
window.socket = socket;
