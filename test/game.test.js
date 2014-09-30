var should = require('should'),
    Game = require('../lib/game.js'),
    Player = require('../lib/player.js');

describe("Game", function() {
  describe("constructor", function() {
    it("instantiates default game object", function() {
      var game = new Game();
      game.should.be.ok;
    })

    it("inits default game attributes", function() {
      var game = new Game();
      game.currentPlayer.should.be.ok;
      game.isStarted.should.be.false;
      game.board.should.be.ok;
    })
  })

  describe("#setupBoard()", function() {
    it("sets up initial board pieces positions by delegating to board object", function() {
      var game = new Game();
      game.setupBoard();
    })
  })

  describe("#start()", function() {
    it("starts game", function() {
      var game = new Game();
      game.start();
      game.isStarted.should.be.true;
    })

    it("fires start event", function(done) {
      var game = new Game();
      game.on('start', function() {
        done();
      });
      game.start();
    })
  })
})
