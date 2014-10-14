'use strict';

var _     = require('lodash'),
    chalk = require('chalk');
/**
 * Constructor for {Board} class
 * @constructor
 */
var Board = module.exports = function() {
  this.squares = [];
  this.init();
};

/**
 * @constant
 * @type {Number}
 * Constant representing board dimensions
 */
Board.SIZE = 8;

/**
 * Init board 8x8 empty squares
 */
Board.prototype.init = function() {
  var dim = Board.SIZE;
  for (var i = 0; i < dim; ++i) {
    var col = [];
    for (var j = 0; j < dim; ++j){
       col[j] = '';
    };
    this.squares[i] = col;
  };

  return true;
};

/**
 * Place piece on board
 * @param {String} str
 */
Board.prototype.place = function(str) {
  function idx(s) {
    return s.charCodeAt(0) - 'a'.charCodeAt(0);
  }

  var piece = str[0];
  var loc = {
    col: idx(str[1]),
    row: str[2] - 1
  };
  this.squares[loc.col][loc.row] = piece;
};

/**
 * Setup board pieces
 */
Board.prototype.setup = function() {
  ['Pa2','Pb2','Pc2','Pd2','Pe2','Pf2','Pg2','Ph2',
   'Ra1','Nb1','Bc1','Qd1','Ke1','Bf1','Ng1','Rh1',
   'pa7','pb7','pc7','pd7','pe7','pf7','pg7','ph7',
   'ra8','nb8','bc8','qd8','ke8','bf8','ng8','rh8'].forEach(function(piece){
    this.place(piece);
  }, this);
};

/**
 * Print board and piece as ASCII array
 * @return {String}
 */
Board.prototype.print = function() {
  function isOdd(i) {
    return i % 2 !== 0;
  }
  function alternatingSquare(idx) {
    return isOdd(idx)
      ? chalk.black.bgWhite(' ' + this._unicode[this.squares[j][i]] + ' ')
      : chalk.black.bgGreen(' ' + this._unicode[this.squares[j][i]] + ' ');
  }

  var rows = [],
      dim  = Board.SIZE;
  for (var i = 0; i < dim; i++) {
    var row = '';
    for (var j = 0; j < dim; j++) {
      row += alternatingSquare.call(this,j-isOdd(i));
    };
    rows[dim-i-1] = row;
  };

  return rows.join('\n');
};

/**
 * Map piece ascii string to unicode string to display symbol
 */
Board.prototype._unicode = {
  p: '♟',
  r: '♜',
  n: '♞',
  b: '♝',
  q: '♛',
  k: '♚',
  P: '♙',
  R: '♖',
  N: '♘',
  B: '♗',
  Q: '♕',
  K: '♔',
  '': ' '
};
