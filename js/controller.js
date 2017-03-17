var AST = AST || {};

AST.driver = undefined;

AST.Controller = ( function(config, Model, View) {
  'use strict';

  let startTime;

  let init = () => {
    Model.init();
    View.init({
      startGame: startGame,
      fire: fire
    });
  };

  let _updateScore = () => {
    let score = Model.getScore();
    View.updateScore(score);
  };

  let _turnCounterClockwise = () => Model.turnCounterClockwise();

  let _turnClockwise = () => Model.turnClockwise();

  let _gameTurn = () => {

    // execute keypresses
    if (AST.keyState[37]) {
      _turnCounterClockwise();
    }
    if (AST.keyState[39]) {
      _turnClockwise();
    }
    if (AST.keyState[38]) {
      _accelerate();
    }

    // tic everything
    _ticAllObjects();

    // check for collisions
    let hit = Model.scanCollisions();
    if (hit) _updateScore();
    if (Model.checkGameOver()) {
      _gameOver();
      return;
    }

    // clear expired shots and tiny asteroids
    Model.clearShots();
    Model.clearAsteroids();

    // teleport objects that are out of bounds
    Model.checkBounds();

    // add asteroids and score if enough time has passed
    if (Date.now() - startTime > config.roundTime) {
      Model.generateOuterAsteroid();
      startTime = Date.now();
      Model.addScore(10);
      _updateScore();
    }

    _render();
  };

  let _ticAllObjects = () => {
    Model.ticShip();
    Model.ticShots();
    Model.ticAsteroids();
  };

  let _render = () => {
    let ship = Model.getShip();
    let shots = Model.getShots();
    let asteroids = Model.getAsteroids();
    View.render(ship, shots, asteroids);
  };

  let _gameOver = () => {
    clearInterval(AST.driver);
    View.gameOver();
  };

  let startGame = () => {
    AST.driver = setInterval( () => {
      _gameTurn();
    }, config.timer)

    startTime = Date.now();
  };

  let fire = () => Model.fire();

  return {
    init: init
  };

})(AST.config, AST.Model, AST.View);


$(document).ready( () => AST.Controller.init() );
