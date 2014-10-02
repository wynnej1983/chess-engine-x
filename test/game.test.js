var should      = require('should'),
    Game        = require('../lib/game.js'),
    Board       = require('../lib/board.js'),
    HumanPlayer = require('../lib/player.js').HumanPlayer,
    PieceColor  = require('../lib/piece.js').PieceColor;

describe("Game", function() {
  describe("constructor", function() {
    it("should instantiate game properly", function() {
      var game = new Game();
      game.should.be.ok;
    })

    it("should init default game attributes", function() {
      var game = new Game();
      game.players.should.be.an.instanceOf(Array);
      game.player.should.be.an.instanceOf(HumanPlayer);
      game.isStarted.should.be.false;
      game.board.should.be.an.instanceOf(Board);
    })

    it("should set both players to HumanPlayers by default", function() {
      var game = new Game();
      game.players[0].should.be.an.instanceOf(HumanPlayer);
      game.players[1].should.be.an.instanceOf(HumanPlayer);
    })

    it("should set player to start as white", function() {
      var game = new Game();
      game.player.color.should.equal(PieceColor.White);
    })
  })

  describe("#setupBoard()", function() {
    it("should delegate to board object to setup pieces", function() {
      var game = new Game();
      game.setupBoard();
    })
  })

  describe("#start()", function() {
    it("should start game", function() {
      var game = new Game();
      game.start();
      game.isStarted.should.be.true;
    })

    it("should fire start event", function(done) {
      var game = new Game();
      game.on('start', function() {
        done();
      });
      game.start();
    })
  })

  describe("#move()", function() {
    it("should throw error if no arguments passed", function() {
      var game = new Game();
      game.start();
      game.move.should.throw();
    })

    it("should throw error if arguments are not a string", function() {
      var game = new Game();
      game.start();
      game.move.bind(null, {}).should.throw();
    })

    it("should be able to move 'e2e4'", function() {
      var game = new Game();
      game.start();
      game.move('e2e4').should.be.true;
    })
  })
})
