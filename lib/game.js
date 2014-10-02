'use strict';

var EventEmitter = require('events').EventEmitter,
    util         = require('util'),
    _            = require('lodash'),
    Board        = require('./board.js'),
    HumanPlayer  = require('./player.js').HumanPlayer,
    PieceColor   = require('../lib/piece.js').PieceColor;

/**
 * Constructor for {Game} class
 */
var Game = module.exports = function() {
  EventEmitter.call(this);
  this.players = [new HumanPlayer(), new HumanPlayer(PieceColor.Black)];
  this.player = this.players[0];
  this.board = new Board();
  this.isStarted = false;

  this.init();
};

util.inherits(Game, EventEmitter);

/**
 * Init the game
 */
Game.prototype.init = function() {
  this.setupBoard();
};

/**
 * Setup board
 */
Game.prototype.setupBoard = function() {
  this.board.setup();
};

/**
 * Starts the game
 */
Game.prototype.start = function() {
  this.isStarted = true;
  this.emit('start');
};

/**
 * Move piece
 */
Game.prototype.move = function(args) {
  if (!args) throw new Error('move arguments required');
  if (!_.isString(args)) throw new Error('move arguments must be a string');

  return args === 'e2e4';
};
