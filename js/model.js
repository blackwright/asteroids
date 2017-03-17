var AST = AST || {};

AST.Model = ( function(config, Constructor) {
  'use strict';

  let ship, asteroids, shots, score;

  let init = () => {
    ship = new Constructor.Ship();
    asteroids = [];
    shots = [];
    score = 0;

    _generateOuterAsteroids(10);
  };

  let _randomLoc = () => {
    return Math.floor(Math.random() * config.boardSize);
  };

  let _randomPosVel = () => {
    return Math.floor(Math.random() * config.asterVel + 1);
  };

  let _randomNegVel = () => {
    return -(_randomPosVel());
  };

  let _randomVel = () => {
    let positive = Math.random() < 0.5;
    if (positive) {
      return _randomPosVel();
    } else {
      return _randomNegVel();
    }
  };

  let _randomRadius = () => {
    return Math.floor(Math.random() * config.asteroidRad + 5);
  };

  let _generateOuterAsteroids = (count) => {
    for (let i = 0; i < count; i++) {
      generateOuterAsteroid();
    }
  };

  let generateOuterAsteroid = () => {
    let side = Math.floor(Math.random() * 4);
    let xLoc, yLoc, xVel, yVel;
    switch(side) {
      case 0:
        xLoc = _randomLoc();
        yLoc = -config.asteroidRad;
        xVel = _randomVel();
        yVel = _randomPosVel();
        break;
      case 1:
        xLoc = config.boardSize + config.asteroidRad;
        yLoc = _randomLoc();
        xVel = _randomNegVel();
        yVel = _randomVel();
        break;
      case 2:
        xLoc = _randomLoc();
        yLoc = config.boardSize + config.asteroidRad;
        xVel = _randomVel();
        yVel = _randomNegVel();
        break;
      case 3:
        xLoc = -config.asteroidRad;
        yLoc = _randomLoc();
        xVel = _randomPosVel();
        yVel = _randomVel();
    }
    let radius = _randomRadius();
    let asteroid = new Constructor.Asteroid(xLoc, yLoc, xVel, yVel, radius);
    asteroids.push(asteroid);
  };

  let accelerate = () => {
    let rads = ship.angle * Math.PI / 180;
    ship.xVel += 0.5 * Math.cos(rads);
    ship.yVel += 0.5 * Math.sin(rads);
  };

  let fire = () => {
    let xLoc = ship.xLoc;
    let yLoc = ship.yLoc;
    let angle = ship.angle;
    let shot = new Constructor.Shot(xLoc, yLoc, angle);
    shots.push(shot);
  };

  let ticShip = () => {
    ship.tic();
  };

  let ticAsteroids = () => {
    asteroids.map( asteroid => asteroid.tic() )
  };

  let ticShots = () => {
    shots.map( shot => {
      shot.tic();
      shot.timeLeft--;
    })
  };

  return {
    init: init,
    generateOuterAsteroid: generateOuterAsteroid,
    accelerate: accelerate,
    fire: fire,
    ticShip: ticShip,
    ticAsteroids: ticAsteroids,
    ticShots: ticShots
  };

})(AST.config, AST.Constructor);
