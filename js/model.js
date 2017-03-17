var AST = AST || {};

AST.Model = ( function(config) {
  'use strict';

  let ship, asteroids, shots, score;

  let init = () => {

  };

  let _randomAsteroidColor = () => {
    let index = Math.floor(Math.random() * config.asteroidColors.length);
    return config.asteroidColors[index];
  };

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

  function Asteroid(xLoc, yLoc, xVel, yVel, radius) {
    MovingObject.call(this, xLoc, yLoc, xVel, yVel);
    this.radius = radius;
    this.color = _randomAsteroidColor();
  }

  Asteroid.prototype = Object.create(MovingObject.prototype);
  Asteroid.constructor = Asteroid;

  return {
    init: init
  };

})(AST.config);
