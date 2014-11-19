'use strict';

var util       = require('util'),
    utils      = require('./util.js'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {King} class
 * @constructor
 */
var King = module.exports = function(color) {
  Piece.call(this, color);
};

util.inherits(King, Piece);

/**
 * Gets king default motions from source square
 * @returns {Array}
 */
King.prototype.getMotions = function(src) {
  var pos = utils.san2Pos(this.src);
  var motions = [];
  return motions;
};

/**
 * Returns string representation for piece
 * @returns {String}
 */
King.prototype.toString = function(isUnicode) {
  return this.color === PieceColor.White ? (isUnicode ? '♔': 'K') : (isUnicode ? '♚': 'k');
}
