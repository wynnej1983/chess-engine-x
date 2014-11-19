'use strict';

var EventEmitter = require('events').EventEmitter,
    util         = require('util'),
    _            = require('lodash'),
    Move         = require('./move.js'),
    Board        = require('./board.js'),
    HumanPlayer  = require('./player.js').HumanPlayer,
    PieceColor   = require('./piece.js').PieceColor;

/**
 * Constructor for {Game} class
 * @constructor
 * @param {Board} board
 * @param {Object} opts
 */
var Game = module.exports = function(board, opts) {
  EventEmitter.call(this);
  //add game instance as static singleton variable
  //Game.Instance = this;

  this.options = _.defaults(opts || {}, {
    isWhiteFirst: true,
    autoStart: true
  });

  this.board = board || new Board({isWhiteTurn: this.options.isWhiteFirst});
  this.players = {
    white: new HumanPlayer(PieceColor.White),
    black: new HumanPlayer(PieceColor.Black)
  };
  this.moveList = [];
  this.captures = this.board.captures;
  this.isStarted = false;

  this.init();
};

util.inherits(Game, EventEmitter);

/**
 * Init the game
 * @returns {boolean}
 */
Game.prototype.init = function() {
  this.setupBoard();
  this.board.isWhiteTurn = this.options.isWhiteFirst;
  this.player = this.options.isWhiteFirst ? this.players.white : this.players.black;
  return true;
};

/**
 * Setup board
 */
Game.prototype.setupBoard = function() {
  this.board.setup();
  this.player = this.board.isWhiteTurn ? this.players.white : this.players.black;
};

/**
 * Starts the game
 */
Game.prototype.start = function() {
  if (this.isStarted) {
    throw new Error('game is already started');
  }
  this.isStarted = true;
  this.emit('start');
};

/**
 * Move piece
 * @param {String} args
 * @returns {boolean}
 */
Game.prototype.move = function(args) {
  if (!this.isStarted) return false;
  var move = this.board.move(args);
  if (move) {
    this.moveList.push(move);
    this.player = this.player === this.players.white ? this.players.black : this.players.white;
    this.emit('move', { isWhite: this.board.isWhiteTurn });
  }
  return !!move;
};
