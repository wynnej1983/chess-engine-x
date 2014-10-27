var should      = require('should'),
    Move        = require('../lib/move.js'),
    HumanPlayer = require('../lib/player.js').HumanPlayer,
    PieceColor  = require('../lib/piece.js').PieceColor,
    Game        = require('../lib/game.js');

describe('Move', function() {
  describe('constructor', function() {
    var game = null;
    beforeEach(function(){
      game = new Game();
      game.start();
    })
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
      var move = new Move('e2e4', game.board, game.player);
      move.should.have.property('piece');
      move.should.have.property('san');
      move.should.have.property('src');
      move.should.have.property('dst');
    })

    it('should parse e2e4', function() {
      var move = new Move('e2e4', game.board, new HumanPlayer(PieceColor.White));
      move.src.should.equal('e2');
      move.dst.should.equal('e4');
      move.piece.should.equal('P');
    });

    it('should parse Ng1f3', function() {
      var move = new Move('Ng1f3', game.board, new HumanPlayer(PieceColor.White));
      move.piece.should.equal('N');
      move.src.should.equal('g1');
      move.dst.should.equal('f3');
    });

    it('should parse Bd3xh7', function() {
      var move = new Move('Bd3xh7', game.board, new HumanPlayer(PieceColor.White));
      move.piece.should.equal('B');
      move.src.should.equal('d3');
      move.dst.should.equal('h7');
      move.capture.should.equal('p');
    });
  });
});
