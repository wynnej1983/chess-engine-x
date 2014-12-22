var should      = require('should'),
    Move        = require('../lib/move.js'),
    HumanPlayer = require('../lib/player.js').HumanPlayer,
    PieceColor  = require('../lib/piece.js').PieceColor,
    Board       = require('../lib/board.js');

describe('Move', function() {
  var board = null;
  beforeEach(function(){
    board = new Board();
    board.setup();
  })
  describe('constructor', function() {
    it('should throw error if no arguments passed', function() {
      (function(){new Move()}).should.throw();
    });

    it('should throw error if arguments are not a string', function() {
      (function(){new Move({})}).should.throw();
    });

    it('should throw error if board argument is not passed', function() {
      (function(){new Move('e2e4', null)}).should.throw();
    });

    it('should init default attributes', function() {
      var move = new Move('e2e4', board);
      move.should.have.property('san');
      move.should.have.property('piece');
      move.should.have.property('src');
      move.should.have.property('dst');
      move.should.have.property('capturedPiece');
      move.should.have.property('isWhite');
    })

    it('should parse e2e4', function() {
      var move = new Move('e2e4', board);
      move.src.should.equal('e2');
      move.dst.should.equal('e4');
      move.piece.toString().should.equal('P');
    });

    it('should parse Ng1f3', function() {
      var move = new Move('Ng1f3', board);
      move.piece.toString().should.equal('N');
      move.src.should.equal('g1');
      move.dst.should.equal('f3');
    });

    it('should parse Bb1xh7', function() {
      var move = new Move('Bc1xh7', board);
      move.piece.toString().should.equal('B');
      move.src.should.equal('c1');
      move.dst.should.equal('h7');
      console.log(board.print());
      move.capturedPiece.toString().should.equal('p');
    });
  });

  describe('#toString', function() {
    it('should return pretty formatted move string', function() {
      var move = new Move('e2e4', board);
      move.toString().should.eql('Move:[e2e4] White Pawn to e4');
    });
  });
});
