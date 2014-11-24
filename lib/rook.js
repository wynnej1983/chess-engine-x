'use strict';

module.exports = Rook;

var util       = require('util'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Rook} class
 * @constructor
 */
function Rook(color) {
  Piece.call(this, color);
}

util.inherits(Rook, Piece);

/**
 * Gets rook default motions from source square
 * @returns {Array}
 */
Rook.prototype.getMotions = function(src) {
  var pos = utils.san2Pos(this.src);
  var motions = [];
  return motions;
};

/**
 * Returns string representation for piece
 * @returns {String}
 */
Rook.prototype.toString = function(isUnicode) {
  return this.color === PieceColor.White ? (isUnicode ? '♖': 'R') : (isUnicode ? '♜': 'r');
};
