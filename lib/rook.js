'use strict';

var util       = require('util'),
    utils      = require('./util.js'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Rook} class
 * @constructor
 */
var Rook = module.exports = function(color) {
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
