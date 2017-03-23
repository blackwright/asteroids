var AST = AST || {};


// Pass in config object via dependency injection.

AST.Constructor = ( (config) => {
  'use strict';


  const _randomAsteroidColor = () => {
    let index = Math.floor(Math.random() * config.asteroidColors.length);
    return config.asteroidColors[index];
  };


  // All objects inherit from the MovingObject prototype, containing data for
  // X/Y coordinates, X/Y velocity, a tic function for moving the object over
  // time, and a checkBounds function for teleporting the object when out of
  // bounds.

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


  // Ship constructor adds angle and alive properties to MovingObject.

  function Ship() {
    let loc = config.boardSize / 2;
    MovingObject.call(this, loc, loc, 0, 0);
    this.angle = -90;
    this.alive = true;
  }

  Ship.prototype = Object.create(MovingObject.prototype);
  Ship.constructor = Ship;


  // Shot constructor has timer counting down to deletion - shots only
  // exist for a limited amount of time.

  function Shot(xLoc, yLoc, angle) {
    let rads = angle * Math.PI / 180;
    let xVel = config.shotVel * Math.cos(rads);
    let yVel = config.shotVel * Math.sin(rads);
    MovingObject.call(this, xLoc, yLoc, xVel, yVel);
    this.timeLeft = 30;
  }

  Shot.prototype = Object.create(MovingObject.prototype);
  Shot.constructor = Shot;


  // Asteroid constructor adds radius and color properties.

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
