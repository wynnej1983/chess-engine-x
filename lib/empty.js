'use strict';

var util       = require('util'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Empty} class
 * @constructor
 */
var Empty = module.exports = function(color) {
  Piece.call(this, color);
};

util.inherits(Empty, Piece);

/**
 * Gets empty piece default motions from source square
 * @returns {Array}
 */
Empty.prototype.getMotions = function(src) {
  return [];
};

/**
 * Returns string representation for empty piece
 * @returns {String}
 */
Empty.prototype.toString = function(isUnicode) {
  return isUnicode ? ' ' : '';
}
