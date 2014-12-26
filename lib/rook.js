'use strict';

module.exports = Rook;

var util       = require('./util.js'),
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
  this.notation = this.color === PieceColor.White ? 'R' : 'r';
}

util.inherits(Rook, Piece);

/**
 * Gets rook default motions from source square
 * @returns {Array}
 */
Rook.prototype.getMotions = function(src) {
  var pos = Board.san2Pos(this.src);
  var motions = [];
  return motions;
};
