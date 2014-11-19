'use strict';

var util       = require('util'),
    utils      = require('./util.js'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Queen} class
 * @constructor
 */
var Queen = module.exports = function(color) {
  Piece.call(this, color);
};

util.inherits(Queen, Piece);

/**
 * Gets queen default motions from source square
 * @returns {Array}
 */
Queen.prototype.getMotions = function(src) {
  var pos = utils.san2Pos(this.src);
  var motions = [];
  return motions;
};

/**
 * Returns string representation for piece
 * @returns {String}
 */
Queen.prototype.toString = function(isUnicode) {
  return this.color === PieceColor.White ? (isUnicode ? '♕': 'Q') : (isUnicode ? '♛': 'q');
}
