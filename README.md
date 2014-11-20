[![Build Status](https://travis-ci.org/wynnej1983/chess-engine-x.svg?branch=master)](https://travis-ci.org/wynnej1983/chess-engine-x)
[![Coverage Status](https://img.shields.io/coveralls/wynnej1983/chess-engine-x.svg)](https://coveralls.io/r/wynnej1983/chess-engine-x)

chess-engine-x
==============

A chess engine which can be consumed by the browser or node

## Installation

    $ npm install chess-engine-x --save

## Usage

```javascript
  var cex = require('chess-engine-x'),
      game = new cex.Game();

  game.on('move', function(data) {
    console.log('moved: ' + data.move);
  });
  game.on('end', function(data) {
    console.log('game over!');
  });
  game.start();
  game.move('e2e4');
``` 

## Tests

    $ npm test

## Contributing

Contributers welcome!

## Release History

* 0.1.0 Initial release
