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
  function addStartButton() {
    var startButton = document.createElement('button');
    startButton.appendChild(document.createTextNode('Start'));
    container.appendChild(startButton);

    startButton.addEventListener('click', function() {
      // GAME: Call server to switch state for clients to game start
      socket.emit('start');
      reset();

      var endButton = document.createElement('button');
      endButton.appendChild(document.createTextNode('End'));
      container.appendChild(endButton);

      endButton.addEventListener('click', function() {
        endGame();
      });
    });
  }

  function endGame() {
    // GAME: Send result on end of game to server
    // FIXME: add who won the game to notify player ;)
    socket.emit('end');

    reset();
    addStartButton();
  }

  addStartButton();

  socket.on('input', function (data) {
    // GAME: handle user inputs in game here!
    console.log('input', data);
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

    control1Button.addEventListener('click', function () {
      socket.emit('input', { control1: true, control2: false });
    });

    var control2Button = document.createElement('div');
    control2Button.className = 'control';
    container.appendChild(control2Button);

    control2Button.addEventListener('click', function () {
      socket.emit('input', { control1: false, control2: true });
    });

    console.log('Game started.');
  });

  socket.on('end', function (data) {
    reset();

    html.style.backgroundColor = color;

    console.log('end', data);
  });
}
