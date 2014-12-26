'use strict';

exports.Player = Player;
exports.HumanPlayer = HumanPlayer;
exports.AIPlayer = AIPlayer;

var util = require('./util.js');
var PieceColor = require('./piece.js').PieceColor;

/**
 * Constructor for {Player} class
 * @param {PieceColor} color
 */
function Player(color) {
  this.color = color || PieceColor.White;
};

/**
 * Constructor for {HumanPlayer} class
 * @param {PieceColor} color
 */
function HumanPlayer(color) {
  Player.call(this, color);
};

util.inherits(HumanPlayer, Player);

/**
 * Constructor for {AIPlayer} class
 * @param {PieceColor} color
 */
function AIPlayer(color) {
  Player.call(this, color);
};

util.inherits(AIPlayer, Player);
