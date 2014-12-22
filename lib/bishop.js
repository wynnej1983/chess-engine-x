'use strict';

module.exports = Bishop;

var util       = require('util'),
    piece      = require('./piece.js'),
    Board      = require('./board.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Bishop} class
 * @constructor
 */
function Bishop(color) {
  Piece.call(this, color);
  this.notation = this.color === PieceColor.White ? 'B' : 'b';
};

util.inherits(Bishop, Piece);

/**
 * Gets bishop piece default motions from source square
 * @returns {Array}
 */
Bishop.prototype.getMotions = function(src) {
  var pos = Board.san2Pos(this.src);
  var motions = [];
  return motions;
};
