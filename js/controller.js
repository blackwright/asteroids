var ASTEROIDS = ASTEROIDS || {};

ASTEROIDS.Controller = ( function(Model, View) {

  let init = () => {
    Model.init();
    View.init({});
  };

  return {
    init: init
  };

})(ASTEROIDS.Model, ASTEROIDS.View);
