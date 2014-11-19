'use strict';

var util       = require('util'),
    utils      = require('./util.js'),
    piece      = require('./piece.js'),
    Piece      = piece.Piece,
    PieceColor = piece.PieceColor;

/**
 * Constructor for {Pawn} class
 * @constructor
 */
var Pawn = module.exports = function(color) {
  Piece.call(this, color);
}

util.inherits(Pawn, Piece);

/**
 * Gets pawn default motions from source square
 * @returns {Array}
 */
Pawn.prototype.getMotions = function(src) {
  var pos = utils.san2Pos(src);
  var motions = [];
  if (this.color === PieceColor.White) {
    motions.push(utils.pos2San({x: pos.x, y: pos.y + 1}));
    motions.push(utils.pos2San({x: pos.x, y: pos.y + 2}));
    motions.push(utils.pos2San({x: pos.x - 1, y: pos.y + 1}));
    motions.push(utils.pos2San({x: pos.x + 1, y: pos.y + 1}));
  } else {
    motions.push(utils.pos2San({x: pos.x, y: pos.y - 1}));
    motions.push(utils.pos2San({x: pos.x, y: pos.y - 2}));
    motions.push(utils.pos2San({x: pos.x - 1, y: pos.y - 1}));
    motions.push(utils.pos2San({x: pos.x + 1, y: pos.y - 1}));
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
