'use strict';

module.exports = King;

var util       = require('./util.js'),
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
  this.notation = this.color === PieceColor.White ? 'K' : 'k';
};

util.inherits(King, Piece);

/**
 * Gets king default motions from source square
 * @returns {Array}
 */
King.prototype.getMotions = function(src) {
  var pos = Board.san2Pos(this.src);
  var motions = [];
  return motions;
};
