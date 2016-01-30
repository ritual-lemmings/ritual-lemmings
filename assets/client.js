var body = document.querySelector('body');

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
  var startButton = document.createElement('button');
  startButton.appendChild(document.createTextNode('Start'));
  body.appendChild(startButton);

  startButton.addEventListener('click', function() {
    socket.emit('start');
  });

  socket.on('input', function (data) {
    console.log('input', data);
  });
}

function bootSlave(data) {
  console.log('My color is', data.clientColor);

  var html = document.querySelector('html');
  html.style.backgroundColor = data.clientColor;

  socket.on('start', function (data) {
    console.log('Game started.');
  });
}


function meep() {
  console.log('sending meep...');
  socket.emit('nachricht', { data: 'meep' });
}
window.socket = socket;
