'use strict';

var util = require('util');

var PieceColor = require('./piece.js').PieceColor;

/**
 * Constructor for {Player} class
 * @param {PieceColor} color
 */
var Player = function(color) {
  this.color = color || PieceColor.White;
};

/**
 * Constructor for {HumanPlayer} class
 * @param {PieceColor} color
 */
var HumanPlayer = function(color) {
  Player.call(this, color);
};

util.inherits(HumanPlayer, Player);

/**
 * Constructor for {AIPlayer} class
 * @param {PieceColor} color
 */
var AIPlayer = function(color) {
  Player.call(this, color);
};

util.inherits(AIPlayer, Player);

module.exports = {
  Player: Player,
  HumanPlayer: HumanPlayer,
  AIPlayer: AIPlayer
};
