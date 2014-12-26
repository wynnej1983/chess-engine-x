'use strict';

module.exports = Empty;

var util       = require('./util.js'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Empty} class
 * @constructor
 */
function Empty(color) {
  Piece.call(this, color);
  this.notation = '';
};

util.inherits(Empty, Piece);

/**
 * Gets empty piece default motions from source square
 * @returns {Array}
 */
Empty.prototype.getMotions = function(src) {
  return [];
};
