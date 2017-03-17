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

  return {
    init: init
  };

})(AST.config);
