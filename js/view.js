var AST = AST || {};


AST.View = ( function(config) {
  'use strict';


  let astCanvas, astCtx,
      starsCanvas, starsCtx;

  // return stub object
  let stub = {};


  // Callbacks are passed from controller, then passed into event handlers.

  stub.init = (callbacks) => {

    let startGame = callbacks.startGame;
    let resetGame = callbacks.resetGame;
    let fire = callbacks.fire;

    // set up event listeners
    _startButtonListener(startGame);
    _resetButtonListener(resetGame);
    _keyListeners(fire);

    // setup canvas size and assign ctx for drawing
    _setUpCanvases(config.boardSize);

    // array of background star locations
    let stars = _generateStars();
    _renderStars(stars);
  };


  const _$startButton = $('<button>').attr('id', 'start-button')
                                   .text('Start Game');


  const _$resetButton = $('<button>').attr('id', 'reset-button')
                                   .text('Reset Game');


  // startButton and resetButton listeners use 'one' instead of 'on' to
  // avoid duplication on reset.

  const _startButtonListener = (startGame) => {
    $('#control-panel').one('click', '#start-button', () => {
      $('#control-panel').empty()
                         .append(_$resetButton);
      startGame();
    });
  };


  const _resetButtonListener = (resetGame) => {
    $('#control-panel').one('click', '#reset-button', () => {
      $('#control-panel').empty()
                         .append(_$startButton);

      // remove listeners to avoid duplication
      $(document).off();
      $(window).off();
      resetGame();
    })
  };


  const _keyListeners = (fire) => {
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


  const _setUpCanvases = (boardSize) => {
    astCanvas = document.getElementById('asteroids-canvas');
    astCtx = astCanvas.getContext('2d');

    starsCanvas = document.getElementById('stars-canvas');
    starsCtx = starsCanvas.getContext('2d');

    astCanvas.width = starsCanvas.width = boardSize;
    astCanvas.height = starsCanvas.height = boardSize;
  };


  // Each star is an X/Y coordinate pushed into the stars array.

  const _generateStars = () => {
    let newStars = [];
    let count = config.boardSize / 10;
    for (let i = 0; i < count; i++) {
      let x = Math.floor(Math.random() * config.boardSize);
      let y = Math.floor(Math.random() * config.boardSize);
      newStars.push([x, y]);
    }
    return newStars;
  };


  const _renderStars = (stars) => {
    // render black background
    starsCtx.fillStyle = 'black';
    starsCtx.fillRect(0, 0, starsCanvas.width, starsCanvas.height);

    // render stars
    starsCtx.fillStyle = 'white';
    stars.forEach( star => starsCtx.fillRect(star[0], star[1], 1, 1) );
  };


  stub.updateScore = (score) => {
    $('#score').text(score);
  };


  stub.render = (ship, shots, asteroids) => {

    // clear canvas
    astCtx.clearRect(0, 0, astCanvas.width, astCanvas.height);

    // render ship based on its angle
    astCtx.save();
    astCtx.translate(ship.xLoc, ship.yLoc);
    astCtx.rotate( (ship.angle + 90) * Math.PI / 180);
    astCtx.beginPath();
    astCtx.moveTo(0, -10);
    astCtx.lineTo(-7, 10);
    astCtx.lineTo(7, 10);
    astCtx.fillStyle = '#89C4F4';
    astCtx.fill();
    astCtx.restore();

    // render shots
    astCtx.fillStyle = '#2ECC71';
    shots.forEach( (shot) => astCtx.fillRect(shot.xLoc, shot.yLoc, 1, 1) );

    // render asteroids
    asteroids.forEach( (asteroid) => {
      astCtx.beginPath();
      astCtx.arc(asteroid.xLoc, asteroid.yLoc, asteroid.radius, 0, 2 * Math.PI, false);
      astCtx.fillStyle = asteroid.color;
      astCtx.shadowColor = '#333';
      astCtx.shadowBlur = 5;
      astCtx.fill();
    });
  };
  

  stub.gameOver = () => {

    // 'Game Over' text rendered with a black 'shadow' 4px lower
    let x = astCanvas.width / 2;
    let y = astCanvas.height / 2 + 4;
    astCtx.font = "30px 'Press Start 2P'";
    astCtx.textAlign = 'center';
    astCtx.fillStyle = 'black';
    astCtx.fillText('Game Over!', x, y);

    y = astCanvas.height / 2;
    astCtx.fillStyle = '#00B16A';
    astCtx.fillText('Game Over!', x, y);
  };


  return stub;

})(AST.config);
