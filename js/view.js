var AST = AST || {};


AST.View = ( function(config) {
  'use strict';


  let canvas, ctx, stars;

  // return stub object
  let stub = {};


  // Callbacks are passed from controller, then passed into event handlers.

  stub.init = (callbacks) => {

    // array of background star locations
    stars = [];

    let startGame = callbacks.startGame;
    let resetGame = callbacks.resetGame;
    let fire = callbacks.fire;

    _setUpCanvas(config.boardSize);
    _generateStars();

    // set up event listeners
    _startButtonListener(startGame);
    _resetButtonListener(resetGame);
    _keyListeners(fire);
  };


  let _$startButton = $('<button>').attr('id', 'start-button')
                                   .text('Start Game');


  let _$resetButton = $('<button>').attr('id', 'reset-button')
                                   .text('Reset Game');


  // startButton and resetButton listeners use 'one' instead of 'on' to
  // avoid duplication on reset.

  let _startButtonListener = (startGame) => {
    $('#control-panel').one('click', '#start-button', () => {
      $('#control-panel').empty()
                         .append(_$resetButton);
      startGame();
    });
  };


  let _resetButtonListener = (resetGame) => {
    $('#control-panel').one('click', '#reset-button', () => {
      $('#control-panel').empty()
                         .append(_$startButton);

      // remove listeners to avoid duplication
      $(document).off();
      $(window).off();
      resetGame();
    })
  };


  let _keyListeners = (fire) => {
     window.addEventListener('keydown', (event) => {
      event.preventDefault();
      AST.keyState[event.keyCode || event.which] = true;
    }, true);

    window.addEventListener('keyup', (event) => {
      AST.keyState[event.keyCode || event.which] = false;
    }, true);

    $(document).keydown( (event) => {
      // space bar
      if (event.which === 32) {
        fire();
      }
    });
  };


  let _setUpCanvas = (boardSize) => {
    canvas = document.getElementById('asteroids-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = boardSize;
    canvas.height = boardSize;
  };


  // Each star is an X/Y coordinate pushed into the stars array.

  let _generateStars = () => {
    let count = config.boardSize / 10;
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * config.boardSize);
      let y = Math.floor(Math.random() * config.boardSize);
      stars.push([x, y]);
    }
  };


  stub.updateScore = (score) => {
    $('#score').text(score);
  };


  stub.render = (ship, shots, asteroids) => {

    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // render black background
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // render stars
    ctx.fillStyle = 'white';
    stars.forEach( star => ctx.fillRect(star[0], star[1], 1, 1) );

    // render ship based on its angle
    ctx.save();
    ctx.translate(ship.xLoc, ship.yLoc);
    ctx.rotate( (ship.angle + 90) * Math.PI / 180);
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(-7, 10);
    ctx.lineTo(7, 10);
    ctx.fillStyle = '#89C4F4';
    ctx.fill();
    ctx.restore();

    // render shots
    ctx.fillStyle = '#2ECC71';
    shots.forEach( (shot) => ctx.fillRect(shot.xLoc, shot.yLoc, 1, 1) );

    // render asteroids
    asteroids.forEach( (asteroid) => {
      ctx.beginPath();
      ctx.arc(asteroid.xLoc, asteroid.yLoc, asteroid.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = asteroid.color;
      ctx.shadowColor = '#333';
      ctx.shadowBlur = 5;
      ctx.fill();
    });
  };
  

  stub.gameOver = () => {

    // 'Game Over' text rendered with a black 'shadow' 4px lower
    let x = canvas.width / 2;
    let y = canvas.height / 2 + 4;
    ctx.font = "30px 'Press Start 2P'";
    ctx.textAlign = 'center';
    ctx.fillStyle = 'black';
    ctx.fillText('Game Over!', x, y);

    y = canvas.height / 2;
    ctx.fillStyle = '#00B16A';
    ctx.fillText('Game Over!', x, y);
  };


  return stub;

})(AST.config);
