'use strict';

var EventEmitter = require('events').EventEmitter,
    util         = require('util'),
    _            = require('lodash'),
    Move         = require('../lib/move.js'),
    Board        = require('./board.js'),
    HumanPlayer  = require('./player.js').HumanPlayer,
    PieceColor   = require('./piece.js').PieceColor;

/**
 * Constructor for {Game} class
 * @constructor
 */
var Game = module.exports = function(board, opts) {
  EventEmitter.call(this);

  var opts = this._options = opts || {
    isWhiteFirst: true
  };
  this.board = board || new Board();
  this.players = {
    white: new HumanPlayer(PieceColor.White),
    black: new HumanPlayer(PieceColor.Black)
  };
  this.player = opts.isWhiteFirst ? this.players.white : this.players.black;
  this.moveHistory = [];
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

  return true;
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
  if (this.isStarted) {
    throw new Error('game is already started');
  }
  this.isStarted = true;
  this.emit('start');
};

/**
 * Move piece
 * @param {String}
 * @returns {boolean}
 */
Game.prototype.move = function(args) {
  if (!this.isStarted) return false;
  var move = new Move(args);
  //TODO: implement this properly
  if ((move.src === 'e2' && move.dst === 'e4') || (move.src === 'e7' && move.dst === 'e5') || (move.src === 'd2' && move.dst === 'd4') || (move.src === 'd7' && move.dst === 'd5')) {
    if ((move.src === 'e2' && this.player.color === PieceColor.Black) || (move.src === 'e7' && this.player.color === PieceColor.White) || (move.src === 'd2' && this.player.color === PieceColor.Black) || (move.src === 'd7' && this.player.color === PieceColor.White)) {
      return false;
    }
    this.moveHistory.push(move);
    this.player = this.player === this.players.white ? this.players.black : this.players.white;
    this.emit('move');
    return true;
  }

  return false;
};
