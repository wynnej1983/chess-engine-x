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
    })
  })

  describe('#setup()', function() {
    it('should setup default board pieces', function() {
      var board = new Board();
      board.setup();
    })
  })

  describe('#san2Pos()', function() {
    it('should convert a1 to 00', function() {
      var board = new Board();
      board.san2Pos('a1').should.eql({x:0,y:0});
    })
  })

  describe('#pos2San()', function() {
    it('should convert 00 to a1', function() {
      var board = new Board();
      board.pos2San({x:0,y:0}).should.equal('a1');
    })
  })

  describe('#place()', function() {
    it('should place piece', function() {
      var board = new Board();
      board.place('Ke1').should.be.true;
      board.pieceAt('e1').should.equal('K');
    })

    it('should not be able to place piece at invalid location', function() {
      var board = new Board();
      board.place('Ki1').should.be.false;
      board.place('Ke9').should.be.false;
    })

    it('should not be able to place non specified piece', function() {
      var board = new Board();
      board.place('e1').should.be.false;
    })

    it('should not be able to place invalid piece', function() {
      var board = new Board();
      board.place('Le1').should.be.false;
    })
  })

  describe('#move()', function() {
    it('should move e2e4', function() {
      var board = new Board();
      board.setup();
      board.move('e2e4').should.be.ok;
      board.pieceAt('e4').should.equal('P');
    })

    it('should not move e7e5', function() {
      var board = new Board();
      board.setup();
      (board.move('e7e5') === null).should.be.true;
    })

    it('should move move e4xd5', function() {
      var board = new Board();
      board.place('Pe4');
      board.place('pd5');
      console.log(board.print());
      board.move('e4xd5').should.be.ok;
      console.log(board.print());
      board.pieceAt('e4').should.be.equal('');
      board.pieceAt('d5').should.be.equal('P');
    })
  })
})
