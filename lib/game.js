'use strict';

var events = require('events'),
    util   = require('util'),
    Player = require('../lib/player.js');

/**
 * Constructor for {Game} class
 */
var Game = module.exports = function() {
  events.EventEmitter.call(this);
  this.isStarted = false;
  this.currentPlayer = {};
  this.board = {
    squares: new Array(64),
    pieces: new Array(32)
  };

  this.init();
};

util.inherits(Game, events.EventEmitter);

/**
 * Init the game
 */
Game.prototype.init = function() {
  this.setupBoard();
};

/**
 * Setup board pieces
 */
Game.prototype.setupBoard = function() {
  
};

/**
 * Starts the game
 */
Game.prototype.start = function() {
  this.isStarted = true;
  this.emit('start');
};
