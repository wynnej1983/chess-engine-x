'use strict';

module.exports = King;

var util       = require('util'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {King} class
 * @constructor
 */
function King(color) {
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
