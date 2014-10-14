var should      = require('should'),
    Board       = require('../lib/board.js');

describe('Board', function() {
  describe('constructor', function() {
    it('should instantiate board', function() {
      var board = new Board();
      board.should.be.ok;
    })

    it('should init default attributes', function() {
      var board = new Board();
      board.squares.should.be.ok;
      board.squares.should.be.an.Array;
      Board.SIZE.should.equal(8);
    })

    it('should init board empty with squares', function() {
      var board = new Board();
      board.squares.length.should.equal(8);
      board.squares.forEach(function(rank){
        rank.should.be.an.Array;
        rank.length.should.equal(8);
        rank.forEach(function(square){
          square.should.equal('');
        });
      });
      console.log(board.print());
    })
  })

  describe('#place()', function() {
    it('should place piece', function() {
      var board = new Board();
      board.place('Ke1');
      board.squares[4][0].should.equal('K');
      console.log(board.print());
    })

  })

  describe('#setup()', function() {
    it('should setup default board pieces', function() {
      var board = new Board();
      board.setup();
      console.log(board.print());
    })
  })
})
