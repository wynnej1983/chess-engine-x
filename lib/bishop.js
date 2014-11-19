'use strict';

var util       = require('util'),
    utils      = require('./util.js'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Bishop} class
 * @constructor
 */
var Bishop = module.exports = function(color) {
  Piece.call(this, color);
};

util.inherits(Bishop, Piece);

/**
 * Gets bishop piece default motions from source square
 * @returns {Array}
 */
Bishop.prototype.getMotions = function(src) {
  var pos = utils.san2Pos(this.src);
  var motions = [];
  return motions;
};

/**
 * Returns string representation for piece
 * @returns {String}
 */
Bishop.prototype.toString = function(isUnicode) {
  return this.color === PieceColor.White ? (isUnicode ? '♗': 'B') : (isUnicode ? '♝': 'b');
}
