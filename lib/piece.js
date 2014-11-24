'use strict';

exports.Piece = Piece;

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
Piece.prototype.toString = function(isUnicode) {
};
