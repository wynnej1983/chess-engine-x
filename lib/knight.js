'use strict';

module.exports = Knight;

var util       = require('util'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Knight} class
 * @constructor
 */
function Knight(color) {
  Piece.call(this, color);
};

util.inherits(Knight, Piece);

/**
 * Gets knight default motions from source square
 * @returns {Array}
 */
Knight.prototype.getMotions = function(src) {
  var pos = Board.san2Pos(src);
  //TODO implement motions properly
  var motions = ['c3'];
  return motions;
};

/**
 * Returns string representation for piece
 * @returns {String}
 */
Knight.prototype.toString = function(isUnicode) {
  return this.color === PieceColor.White ? (isUnicode ? '♘': 'N') : (isUnicode ? '♞': 'n');
}
