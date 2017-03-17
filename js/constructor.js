var AST = AST || {};

AST.Constructor = ( function(config) {
  'use strict';

  function MovingObject(xLoc, yLoc, xVel, yVel) {
    this.xLoc = xLoc;
    this.yLoc = yLoc;
    this.xVel = xVel;
    this.yVel = yVel;

    this.tic = function() {
      this.xLoc += this.xVel;
      this.yLoc += this.yVel;
    };

    this.checkBounds = function() {
      if (this.xLoc < -config.asteroidRad) {
        this.xLoc += (config.boardSize + config.asteroidRad);
      } else if (this.xLoc > config.boardSize + config.asteroidRad) {
        this.xLoc -= (config.boardSize + config.asteroidRad);
      }
      if (this.yLoc < -config.asteroidRad) {
        this.yLoc += (config.boardSize + config.asteroidRad);
      } else if (this.yLoc > config.boardSize + config.asteroidRad) {
        this.yLoc -= (config.boardSize + config.asteroidRad);
      }
    };
  }

  function Ship() {
    let loc = config.boardSize / 2;
    MovingObject.call(this, loc, loc, 0, 0);
    this.angle = -90;
    this.alive = true;
  }

  Ship.prototype = Object.create(MovingObject.prototype);
  Ship.constructor = Ship;

  function Shot(xLoc, yLoc, angle) {
    let rads = angle * Math.PI / 180;
    let xVel = config.shotVel * Math.cos(rads);
    let yVel = config.shotVel * Math.sin(rads);
    MovingObject.call(this, xLoc, yLoc, xVel, yVel);
    this.timeLeft = 30;
  }

  Shot.prototype = Object.create(MovingObject.prototype);
  Shot.constructor = Shot;

  function Asteroid(xLoc, yLoc, xVel, yVel, radius) {
    MovingObject.call(this, xLoc, yLoc, xVel, yVel);
    this.radius = radius;
    this.color = _randomAsteroidColor();
  }

  Asteroid.prototype = Object.create(MovingObject.prototype);
  Asteroid.constructor = Asteroid;

  return {
    Ship: Ship,
    Shot: Shot,
    Asteroid: Asteroid
  };

})(AST.config);
