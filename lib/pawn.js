'use strict';

module.exports = Pawn;

var util       = require('util'),
    Board      = require('./board.js'),
    piece      = require('./piece.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Pawn} class
 * @constructor
 */
function Pawn(color) {
  Piece.call(this, color);
  this.notation = this.color === PieceColor.White ? 'P' : 'p';
}

util.inherits(Pawn, Piece);

/**
 * Gets pawn default motions from source square
 * @returns {Array}
 */
Pawn.prototype.getMotions = function(src) {
  var pos = Board.san2Pos(src);
  var motions = [
            [0,2],
     [-1,1],[0,1],[1,1]
          /*[src]*/
  ].map(function(m) {
    return Board.pos2San(pos.x + m[0], pos.y + this._negateIfBlack(m[1]));
  }.bind(this));

  return motions;
};

Pawn.prototype._negateIfBlack = function(posY) {
  posY *= (this.color === PieceColor.Black ? -1 : 1);
  return posY;
}
