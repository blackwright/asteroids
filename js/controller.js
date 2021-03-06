var AST = AST || {};


// driver variable will be used for setInterval
AST.driver = undefined;


// Pass in config object, Model and View modules via dependency injection.

AST.Controller = ( (config, Model, View) => {
  'use strict';


  // variable used to track how much time has passed since last asteroid spawn
  let spawnTime;


  // initializing all the modules and render on page load
  const init = () => {
    Model.init();

    // pass callbacks into View initialization
    View.init({
      startGame: startGame,
      resetGame: resetGame,
      fire: fire
    });

    _render();
  };


  const _updateScore = () => {
    let score = Model.getScore();
    View.updateScore(score);
  };


  const _accelerate = () => Model.accelerate();


  const _turnCounterClockwise = () => Model.turnCounterClockwise();


  const _turnClockwise = () => Model.turnClockwise();


  const _gameTurn = () => {

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
    if (Date.now() - spawnTime > config.roundTime) {
      Model.generateOuterAsteroid();
      spawnTime = Date.now();
      Model.addScore(10);
      _updateScore();
    }

    _render();
  };


  const _ticAllObjects = () => {
    Model.ticShip();
    Model.ticShots();
    Model.ticAsteroids();
  };


  const _render = () => {
    let ship = Model.getShip();
    let shots = Model.getShots();
    let asteroids = Model.getAsteroids();
    View.render(ship, shots, asteroids);
  };


  const _gameOver = () => {
    clearInterval(AST.driver);
    View.gameOver();
  };


  const startGame = () => {
    AST.driver = setInterval( () => {
      _gameTurn();
    }, config.timer)

    spawnTime = Date.now();
  };


  const resetGame = () => {
    clearInterval(AST.driver);
    init();
    _updateScore();
  };


  const fire = () => Model.fire();


  return {
    init: init
  };

})(AST.config, AST.Model, AST.View);


// kicks off the whole thing
$(document).ready( () => AST.Controller.init() );
