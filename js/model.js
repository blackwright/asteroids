var AST = AST || {};

AST.Model = ( function(config, Constructor) {
  'use strict';

  let ship, asteroids, shots, score;

  let stub = {};

  stub.init = () => {
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
    return Math.floor(Math.random() * config.asteroidVel + 1);
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
      stub.generateOuterAsteroid();
    }
  };

  let _fragment = (asteroid) => {
    let xLoc = asteroid.xLoc;
    let yLoc = asteroid.yLoc;
    let count = Math.floor(Math.random() * 3 + 1);
    for (let i = 0; i < count; i++) {
      let radiusDivisor = Math.random() * 3 + 1;
      let radius = asteroid.radius / radiusDivisor;
      let xVel, yVel;
      if (asteroid.xVel > 0) {
        xVel = _randomPosVel() + 1;
      } else {
        xVel = _randomNegVel() - 1;
      }
      if (asteroid.yVel > 0) {
        yVel = _randomPosVel() + 1;
      } else {
        yVel = _randomNegVel() - 1;
      }
      let newAsteroid = new Constructor.Asteroid(xLoc, yLoc, xVel, yVel, radius);
      asteroids.push(newAsteroid);
    }
  };

  let _objCollision = (obj, asteroid) => {
    let dx = obj.xLoc - asteroid.xLoc;
    let dy = obj.yLoc - asteroid.yLoc;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < asteroid.radius) return true;
    return false;
  };

  stub.getShip = () => {
    return ship;
  };

  stub.getShots = () => {
    return shots;
  };

  stub.getAsteroids = () => {
    return asteroids;
  };

  stub.getScore = () => {
    return score;
  };

  stub.addScore = (amount) => {
    return score += amount;
  };

  stub.accelerate = () => {
    let rads = ship.angle * Math.PI / 180;
    ship.xVel += 0.5 * Math.cos(rads);
    ship.yVel += 0.5 * Math.sin(rads);
  };

  stub.turnCounterClockwise = () => {
    return ship.angle -= config.turnSpeed;
  };

  stub.turnClockwise = () => {
    return ship.angle += config.turnSpeed;
  };

  stub.checkGameOver = () => {
    return !ship.alive;
  };

  stub.generateOuterAsteroid = () => {
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

  stub.accelerate = () => {
    let rads = ship.angle * Math.PI / 180;
    ship.xVel += 0.5 * Math.cos(rads);
    ship.yVel += 0.5 * Math.sin(rads);
  };

  stub.fire = () => {
    let xLoc = ship.xLoc;
    let yLoc = ship.yLoc;
    let angle = ship.angle;
    let shot = new Constructor.Shot(xLoc, yLoc, angle);
    shots.push(shot);
  };

  stub.ticShip = () => {
    ship.tic();
  };

  stub.ticAsteroids = () => {
    asteroids.map( asteroid => asteroid.tic() )
  };

  stub.ticShots = () => {
    shots.map( shot => {
      shot.tic();
      shot.timeLeft--;
    })
  };

  stub.clearShots = () => {
    for (let i = shots.length - 1; i >= 0; i--) {
      if (shots[i].timeLeft === 0) shots.splice(i, 1);
    }
  };

  stub.clearAsteroids = () => {
    for (let i = asteroids.length - 1; i >= 0; i--) {
      if (asteroids[i].radius < 5) asteroids.splice(i, 1);
    }
  };

  stub.scanCollisions = () => {
    let hit = false;
    for (let a = asteroids.length - 1; a >= 0; a--) {
      let asteroid = asteroids[a];
      if (_objCollision(ship, asteroid)) {
        ship.alive = false;
        return;
      }
      for (let s = shots.length - 1; s >= 0; s--) {
        let shot = shots[s];
        if (_objCollision(shot, asteroid)) {
          _fragment(asteroid);
          shots.splice(s, 1);
          asteroids.splice(a, 1);
          score += Math.ceil(asteroid.radius);
          hit = true;
        }
      }
    }
    return hit;
  };

  stub.checkBounds = () => {
    ship.checkBounds();
    shots.forEach( shot => shot.checkBounds() );
    asteroids.forEach( asteroid => asteroid.checkBounds() );
  };

  return stub;

})(AST.config, AST.Constructor);
