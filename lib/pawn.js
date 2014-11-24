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
}

util.inherits(Pawn, Piece);

/**
 * Gets pawn default motions from source square
 * @returns {Array}
 */
Pawn.prototype.getMotions = function(src) {
  var pos = Board.san2Pos(src);
  var motions = [];
  if (this.color === PieceColor.White) {
    motions = [{x: pos.x, y: pos.y + 1},
               {x: pos.x, y: pos.y + 2},
               {x: pos.x - 1, y: pos.y + 1},
               {x: pos.x + 1, y: pos.y + 1}].map(function(m) {
      return Board.pos2San(m);
    });
  } else {
    motions = [{x: pos.x, y: pos.y - 1},
               {x: pos.x, y: pos.y - 2},
               {x: pos.x - 1, y: pos.y - 1},
               {x: pos.x + 1, y: pos.y - 1}].map(function(m) {
      return Board.pos2San(m);
    });
  }
  return motions;
};

/**
 * Returns string representation for piece
 * @returns {String}
 */
Pawn.prototype.toString = function(isUnicode) {
  return this.color === PieceColor.White ? (isUnicode ? '♙': 'P') : (isUnicode ? '♟': 'p');
};
