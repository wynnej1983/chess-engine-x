'use strict';

exports.Piece = Piece;

var Board = require('./board.js');

/**
 * Enum for piece colors
 */
var PieceColor = exports.PieceColor = {
  White: 'White',
  Black: 'Black'
};

/**
 * Constructor for {Piece} class
 * @constructor
 */
function Piece(color) {
  this.color = color || PieceColor.White;
}

/**
 * Gets empty piece default motions from source square
 * @returns {Array}
 */
Piece.prototype.getMotions = function(src) {
  return [];
};

/**
 * Returns string representation for piece
 * @returns {String}
 */
Piece.prototype.toString = function(isUnicode, descriptive) {
  var str = '';
  if (descriptive) {
    str = this.color + ' ' + this.constructor.toString().split(' ')[1].split(/\(/)[0];
  } else {
    str = isUnicode ? Board.Pieces.unicode(this.notation) : this.notation;
  }

  return str;
};
