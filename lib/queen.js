'use strict';

module.exports = Queen;

var util       = require('util'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Queen} class
 * @constructor
 */
function Queen(color) {
  Piece.call(this, color);
  this.notation = this.color === PieceColor.White ? 'Q' : 'q';
};

util.inherits(Queen, Piece);

/**
 * Gets queen default motions from source square
 * @returns {Array}
 */
Queen.prototype.getMotions = function(src) {
  var pos = Board.san2Pos(this.src);
  var motions = [];
  return motions;
};
