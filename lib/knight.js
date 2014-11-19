'use strict';

var util       = require('util'),
    utils      = require('./util.js'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Knight} class
 * @constructor
 */
var Knight = module.exports = function(color) {
  Piece.call(this, color);
};

util.inherits(Knight, Piece);

/**
 * Gets knight default motions from source square
 * @returns {Array}
 */
Knight.prototype.getMotions = function(src) {
  var pos = utils.san2Pos(src);
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
