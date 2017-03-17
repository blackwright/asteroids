var AST = AST || {};

AST.Controller = ( function(Model, View) {
  'use strict';

  let init = () => {
    Model.init();
    View.init({});
  };

  return {
    init: init
  };

})(AST.Model, AST.View);
