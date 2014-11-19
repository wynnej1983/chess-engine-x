var should      = require('should'),
    Board       = require('../lib/board.js');
    Empty       = require('../lib/empty.js');

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

    it('should init board with empty squares', function() {
      var board = new Board();
      board.squares.length.should.equal(8);
      board.squares.forEach(function(rank){
        rank.should.be.an.Array;
        rank.length.should.equal(8);
        rank.forEach(function(square){
          square.should.be.instanceOf(Empty);
        });
      });
    })
  })

  describe('#setup()', function() {
    it('should setup default board pieces', function() {
      var board = new Board();
      board.setup();
    })

    it('should setup board based on starting position fen provided', function() {
      var board = new Board();
      var fen = 'rnbqkbnr/ppp3pp/8/8/8/8/PPP3PP/RNBQKBNR w KQkq - 0 1';
      board.setup(fen);
    })

    it('should setup board when fen called multiple times', function() {
      var board = new Board();
      var fen = '3r2k1/ppp3pn/3p2Qp/4n3/4Nqb1/8/PPP2PPP/4R1K1 b KQkq - 1 2';
      board.setup(fen);
      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      board.setup(fen);
    })

    it('should set player to move from fen', function() {
      var board = new Board();
      var fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      board.setup(fen);
      board.isWhiteTurn.should.be.true;
      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1';
      board.setup(fen);
      board.isWhiteTurn.should.be.false;
    })

    it('should set castling permissions from fen', function() {
      var board = new Board(),

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.NONE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.ALL);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w K - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_KING_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Q - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_QUEEN_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w k - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.BLACK_KING_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w q - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.BLACK_QUEEN_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQ - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_KING_SIDE | Board.CASTLING_PERMISSIONS.WHITE_QUEEN_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Kk - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_KING_SIDE | Board.CASTLING_PERMISSIONS.BLACK_KING_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Kq - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_KING_SIDE | Board.CASTLING_PERMISSIONS.BLACK_QUEEN_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Qk - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_QUEEN_SIDE | Board.CASTLING_PERMISSIONS.BLACK_KING_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Qq - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_QUEEN_SIDE | Board.CASTLING_PERMISSIONS.BLACK_QUEEN_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQk - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_KING_SIDE | Board.CASTLING_PERMISSIONS.WHITE_QUEEN_SIDE | Board.CASTLING_PERMISSIONS.BLACK_KING_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQq - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_KING_SIDE | Board.CASTLING_PERMISSIONS.WHITE_QUEEN_SIDE | Board.CASTLING_PERMISSIONS.BLACK_QUEEN_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Kkq - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_KING_SIDE | Board.CASTLING_PERMISSIONS.BLACK_KING_SIDE | Board.CASTLING_PERMISSIONS.BLACK_QUEEN_SIDE);

      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w Qkq - 0 1';
      board.setup(fen);
      board.castlingPermissions.should.equal(Board.CASTLING_PERMISSIONS.WHITE_QUEEN_SIDE | Board.CASTLING_PERMISSIONS.BLACK_QUEEN_SIDE | Board.CASTLING_PERMISSIONS.BLACK_KING_SIDE);
    })

    it('should set en passant target from fen', function() {
      var board = new Board(),
      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      board.setup(fen);
      (board.enPassantTarget === null).should.be.true;
      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq e3 0 1';
      board.setup(fen);
      board.enPassantTarget.should.equal('e3');
    })

    it('should set halfmove clock from fen', function() {
      var board = new Board();
      var fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      board.setup(fen);
      board.halfMoveClock.should.equal(0);
      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 1 1';
      board.setup(fen);
      board.halfMoveClock.should.equal(1);
    })

    it('should set fullmove number from fen', function() {
      var board = new Board();
      var fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
      board.setup(fen);
      board.fullMoveNumber.should.equal(1);
      fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 2';
      board.setup(fen);
      board.fullMoveNumber.should.equal(2);
    })
  })

  describe('#fenStringify()', function() {
    it('should convert board position state to fen string', function() {
      var board = new Board();
      board.setup();
console.log(board.print());
      board.fenStringify().should.equal(Board.DEFAULT_FEN);
      var fen = '3r2k1/ppp3pn/3p2Qp/4n3/4Nqb1/8/PPP2PPP/4R1K1 b KQkq - 1 2';
      board.setup(fen);
      board.fenStringify().should.equal(fen);
    })
  })

  describe('#san2Pos()', function() {
    it('should convert a1 to 00', function() {
      var board = new Board();
      board.san2Pos('a1').should.eql({x:0,y:0});
    })
  })

  describe('#pos2San()', function() {
    it('should convert pos to san given {x,y}', function() {
      var board = new Board();
      board.pos2San({x:0,y:0}).should.equal('a1');
    })

    it('should convert pos to san given x,y', function() {
      var board = new Board();
      board.pos2San(0,0).should.equal('a1');
    })
  })

  describe('#place()', function() {
    it('should place piece', function() {
      var board = new Board();
      board.place('Ke1').should.be.true;
      board.pieceAt('e1').toString().should.equal('K');
    })

    it('should be able to place empty piece', function() {
      var board = new Board();
      board.place('e1').should.be.true;
    })

    it('should not be able to place piece at invalid location', function() {
      var board = new Board();
      board.place('Ki1').should.be.false;
      board.place('Ke9').should.be.false;
    })

    it('should not be able to place invalid piece', function() {
      var board = new Board();
      board.place('Le1').should.be.false;
    })
  })

  describe('#move()', function() {
    describe('illegal moves', function() {
      it('should not be able to move piece when opponents turn', function() {
        var board = new Board();
        board.setup();
        (board.move('e7e5') === null).should.be.true;
        board.pieceAt('e7').toString().should.equal('p');
        board.pieceAt('e5').toString().should.equal('');
      })

      it('should not be able to move piece to illegal square', function() {
        var board = new Board();
        board.place('Pe2');
        (board.move('e2e5') === null).should.be.true;
      })
    })
    describe('legal moves', function() {
      it('should be able to move piece', function() {
        var board = new Board();
        board.setup();
        board.move('e2e4').should.be.ok;
        board.pieceAt('e2').toString().should.equal('');
        board.pieceAt('e4').toString().should.equal('P');
      })

      it('should move piece and capture', function() {
        var board = new Board();
        board.place('Pe4');
        board.place('pd5');
        board.move('e4xd5').should.be.ok;
        board.pieceAt('e4').toString().should.be.equal('');
        board.pieceAt('d5').toString().should.be.equal('P');
        board.captures.map(function (p) { return p.toString(); }).should.containEql('p');
      })
    })
  })
})
