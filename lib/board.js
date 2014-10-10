'use strict';

var _  = require('lodash');
/**
 * Constructor for {Board} class
 */
var Board = module.exports = function() {
  this.squares = [];
  this.init();
};

Board.Dim = 8;

/**
 * Init board 8x8 empty squares
 */
Board.prototype.init = function() {
  var dim = Board.Dim;
  for (var i = 0; i < dim; ++i) {
    var col = [];
    for (var j = 0; j < dim; ++j){
       col[j] = '-';
    };
    this.squares[i] = col;
  };
};

/**
 * Place piece on board
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
  this.place('Pa2');
  this.place('Pb2');
  this.place('Pc2');
  this.place('Pd2');
  this.place('Pe2');
  this.place('Pf2');
  this.place('Pg2');
  this.place('Ph2');
  this.place('Ra1');
  this.place('Nb1');
  this.place('Bc1');
  this.place('Qd1');
  this.place('Ke1');
  this.place('Bf1');
  this.place('Ng1');
  this.place('Rh1');

  this.place('pa7');
  this.place('pb7');
  this.place('pc7');
  this.place('pd7');
  this.place('pe7');
  this.place('pf7');
  this.place('pg7');
  this.place('ph7');
  this.place('ra8');
  this.place('nb8');
  this.place('bc8');
  this.place('qd8');
  this.place('ke8');
  this.place('bf8');
  this.place('ng8');
  this.place('rh8');
};

/**
 * Print board as ASCII array
 */
Board.prototype.print = function() {
  var rows = [],
      dim  = Board.Dim;
  for (var i = 0; i < dim; i++) {
    var row = '';
    for (var j = 0; j < dim; j++) {
      row += '  ' + this.squares[j][i] + '  ';
    };
    rows[dim-i-1] = row;
  };

  return rows.join('\n\n');
};
