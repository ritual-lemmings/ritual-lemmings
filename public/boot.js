var html = document.querySelector('html');
var container = document.querySelector('#container');

function reset() {
  html.style.backgroundColor = '#ffffff';
  // kill all elements of container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}


/// game
var socket = io();

socket.on('boot', function (data) {
  console.log('I am', data.clientType);

  reset();

  if (data.clientType === 'master') {
    bootMaster(data);
  } else {
    bootSlave(data);
  }
});

function bootMaster(data) {
  bootGame();

  drawQrcode(window.location.origin);
}

function drawQrcode(text) {
  var qrcodedraw = new QRCodeLib.QRCodeDraw();

  qrcodedraw.draw(document.getElementById('qrcode'), text, function(error, canvas){
    if(error){
       return console.log('Error =( ', error);
    }
    console.log('success!');
  });
}

function bootSlave(data) {
  console.log('My color is', data.clientColor);

  // FIXME: kind of hotfix caching
  var color = data.clientColor;

  html.style.backgroundColor = data.clientColor;

  socket.on('start', function (data) {
    reset();

    var control1Button = document.createElement('div');
    control1Button.className = 'control';
    container.appendChild(control1Button);

    control1Button.addEventListener('mousedown', function () {
      socket.emit('input', 'control1Down');
    });

    control1Button.addEventListener('mouseup', function () {
      socket.emit('input', 'control1Up');
    });

    var control2Button = document.createElement('div');
    control2Button.className = 'control';
    container.appendChild(control2Button);

    control2Button.addEventListener('mousedown', function () {
      socket.emit('input', 'control2Down');
    });
    control2Button.addEventListener('mouseup', function () {
      socket.emit('input', 'control2Up');
    });

    console.log('Game started.');
  });

  socket.on('end', function (data) {
    reset();

    html.style.backgroundColor = color;

    console.log('end', data);
  });
}
