var should      = require('should'),
    Game        = require('../lib/game.js'),
    Board       = require('../lib/board.js'),
    Move        = require('../lib/move.js'),
    HumanPlayer = require('../lib/player.js').HumanPlayer,
    PieceColor  = require('../lib/piece.js').PieceColor;

describe('Game', function() {
  describe('constructor', function() {
    it('should instantiate game', function() {
      var game = new Game();
      game.should.be.ok;
    })

    it('should init default attributes', function() {
      var game = new Game();
      game.players.should.be.ok;
      game.player.should.be.an.instanceOf(HumanPlayer);
      game.board.should.be.an.instanceOf(Board);
      game.moveHistory.should.be.an.instanceOf(Array);
      game.isStarted.should.be.false;
    })

    it('should instantiate game using passed in board argument', function() {
      var board = new Board();
      var game = new Game(board);
      game.should.be.ok;
      (game.board === board).should.be.true;
    })

    it('should not auto start game if no autostart option is provided', function() {
      var game = new Game(new Board(), { autoStart: false });
      game.isStarted.should.be.false;
    })

    it('should set both players to HumanPlayers by default', function() {
      var game = new Game();
      game.players.white.should.be.an.instanceOf(HumanPlayer);
      game.players.black.should.be.an.instanceOf(HumanPlayer);
    })

    it('should set player to start as white by default', function() {
      var game = new Game();
      game.player.color.should.equal(PieceColor.White);
    })

    it('should set player to start to be white via options', function() {
      var game = new Game(new Board(), { isWhiteFirst: true });
      game.player.color.should.equal(PieceColor.White);
    })

    it('should set player to start to be black via options', function() {
      var game = new Game(new Board(), { isWhiteFirst: false });
      game.player.color.should.equal(PieceColor.Black);
    })
  })

  describe('#setupBoard()', function() {
    it('should delegate to board object to setup pieces', function() {
      var game = new Game();
      game.setupBoard();
    })
  })

  describe('#start()', function() {
    it('should start game', function() {
      var game = new Game();
      game.isStarted.should.be.false;
      game.start();
      game.isStarted.should.be.true;
    })

    it('should throw error if start is called more than once', function() {
      var game = new Game();
      game.start();
      game.start.should.throw();
    })

    it('should fire start event when game is started manually', function(done) {
      var game = new Game();
      game.on('start', function() {
        done();
      });
      game.start();
    })
  })

  describe('#move()', function() {
    describe('invalid moves', function() {
      it('should throw error if no arguments passed', function() {
        var game = new Game();
        game.start();
        game.move.bind(game).should.throw();
      })

      it('should throw error if arguments are not a string', function() {
        var game = new Game();
        game.start();
        game.move.bind(game, {}).should.throw();
      })

      it('should not be able to make first move until game is started', function() {
        var game = new Game();
        game.move('e2e4').should.be.false;
      })

      it('should not be able to make first move for black when white should start first', function() {
        var game = new Game();
        game.start();
        game.move('e7e5').should.be.false;
      })

      it('should not be able to make first move for white when black should start first', function() {
        var game = new Game(new Board(), { isWhiteFirst: false });
        game.start();
        game.move('e2e4').should.be.false;
      })

      it('should not be able to make 2 or more moves per turn', function() {
        var game = new Game();
        game.start();
        game.move('e2e4').should.be.true;
        game.move('d2d4').should.be.false;
        game.move('e7e5').should.be.true;
        game.move('d7d5').should.be.false;
      })

      it('should not append to moveHistory when invalid move is made', function() {
        var game = new Game();
        game.start();
        game.move('e7e5');
        game.moveHistory.length.should.equal(0);
      })
    });

    describe('valid moves', function() {
      it('should be able to make first move of e2e4 when white starts', function() {
        var game = new Game();
        game.start();
        game.move('e2e4').should.be.true;
      })

      it('should change current player after move is made', function() {
        var game = new Game();
        game.start();
        game.player.should.equal(game.players.white);
      })

      it('should not append to moveHistory when invalid move is made', function() {
        var game = new Game();
        game.start();
        game.move('e7e5');
        game.moveHistory.length.should.equal(0);
      })
    });

    describe('valid moves', function() {
      it('should be able to make first move of e2e4 when white starts', function() {
        var game = new Game();
        game.start();
        game.move('e2e4').should.be.true;
      })

      it('should change current player after move is made', function() {
        var game = new Game();
        game.start();
        game.player.should.equal(game.players.white);
        game.move('e2e4');
        game.player.should.equal(game.players.black);
        game.move('e7e5');
        game.player.should.equal(game.players.white);
      })

      it('should be able to make first move of e7e5 when black starts', function() {
        var game = new Game(new Board(), { isWhiteFirst: false });
        game.start();
        game.move('e7e5').should.be.true;
      })

      it('should append to moveHistory when move is made', function() {
        var game = new Game();
        game.start();
        game.move('e2e4');
        game.moveHistory.length.should.equal(1);
        game.moveHistory[0].should.be.an.instanceOf(Move);
      })

      it('should fire move event when move is made', function(done) {
        var game = new Game();
        game.start();
        game.on('move', function() {
          done();
        });
        game.move('e2e4');
      })
    });
  })
})
