'use strict'

var ASTEROIDS = ASTEROIDS || {};

ASTEROIDS.config = {
  timer: 60,
  roundTime: 2000,
  shipVel: 3,
  turnSpeed: 10,
  asteroidVel: 2,
  asteroidRad: 30,
  shotVel: 10,
  boardSize: 500,
  asteroidColors: ['#D2D7D3', '#EEEEEE', '#BDC3C7', '#ECF0F1',
                   '#DADFE1', '#F2F1EF', '#BFBFBF']
};

ASTEROIDS.keyState = {};
