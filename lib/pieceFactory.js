'use strict';

var Pawn   = require('./pawn.js'),
    Rook   = require('./rook.js'),
    Knight = require('./knight.js'),
    Bishop = require('./bishop.js'),
    Queen  = require('./queen.js'),
    King   = require('./king.js');

/**
 * Constructor for {PieceFactory} class
 * @constructor
 */
var PieceFactory = module.exports = function() {
};

/**
 * Creates piece based on piece string and color
 * @param {String} piece
 * @param {PieceColor} color
 * @return {Piece}
 */
PieceFactory.prototype.create = function(piece, color) {
  piece = piece.toLowerCase();
  if (piece !== '' && !/^[prnbqk]{1}$/i.test(piece)) {
    return null;
  }
  switch(piece) {
    case 'p':
      return new Pawn(color);
      break;
    case 'r':
      return new Rook(color);
      break;
    case 'n':
      return new Knight(color);
      break;
    case 'b':
      return new Bishop(color);
      break;
    case 'q':
      return new Queen(color);
      break;
    case 'k':
      return new King(color);
      break;
    case '':
      return new Empty();
      break;
    default:
      return new Empty();
      break;
  }
}
