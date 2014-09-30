!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.cex=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports = module.exports = {
  version: require('../package.json').version,
  Game: function() {}
};

},{"../package.json":2}],2:[function(require,module,exports){
module.exports={
  "name": "chess-engine-x",
  "version": "0.1.0",
  "description": "chess engine for browser and node",
  "main": "./dist/cex.js",
  "scripts": {
    "test": "./node_modules/.bin/mocha",
    "build": "./node_modules/.bin/browserify ./lib/engine.js -d --s cex > ./dist/cex.js"
  },
  "devDependencies": {
    "browserify": "latest",
    "mocha": "^1.19.0",
    "should": "^4.0.4"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/wynnej1983/chess-engine-x"
  },
  "keywords": [
    "chess",
    "game",
    "engine",
    "javascript"
  ],
  "author": "Jonathan Wynne <wynnej1983@gmail.com>",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/wynnej1983/chess-engine-x/issues"
  },
  "homepage": "https://github.com/wynnej1983/chess-engine-x",
  "dependencies": {
    "lodash": "^2.4.1"
  }
}

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy93eW5uZWoxOTgzL2NvZGUvY2hlc3MtZW5naW5lLXgvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy93eW5uZWoxOTgzL2NvZGUvY2hlc3MtZW5naW5lLXgvbGliL2VuZ2luZS5qcyIsIi9Vc2Vycy93eW5uZWoxOTgzL2NvZGUvY2hlc3MtZW5naW5lLXgvcGFja2FnZS5qc29uIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgdmVyc2lvbjogcmVxdWlyZSgnLi4vcGFja2FnZS5qc29uJykudmVyc2lvbixcbiAgR2FtZTogZnVuY3Rpb24oKSB7fVxufTtcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJuYW1lXCI6IFwiY2hlc3MtZW5naW5lLXhcIixcbiAgXCJ2ZXJzaW9uXCI6IFwiMC4xLjBcIixcbiAgXCJkZXNjcmlwdGlvblwiOiBcImNoZXNzIGVuZ2luZSBmb3IgYnJvd3NlciBhbmQgbm9kZVwiLFxuICBcIm1haW5cIjogXCIuL2Rpc3QvY2V4LmpzXCIsXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJ0ZXN0XCI6IFwiLi9ub2RlX21vZHVsZXMvLmJpbi9tb2NoYVwiLFxuICAgIFwiYnVpbGRcIjogXCIuL25vZGVfbW9kdWxlcy8uYmluL2Jyb3dzZXJpZnkgLi9saWIvZW5naW5lLmpzIC1kIC0tcyBjZXggPiAuL2Rpc3QvY2V4LmpzXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiYnJvd3NlcmlmeVwiOiBcImxhdGVzdFwiLFxuICAgIFwibW9jaGFcIjogXCJeMS4xOS4wXCIsXG4gICAgXCJzaG91bGRcIjogXCJeNC4wLjRcIlxuICB9LFxuICBcInJlcG9zaXRvcnlcIjoge1xuICAgIFwidHlwZVwiOiBcImdpdFwiLFxuICAgIFwidXJsXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3d5bm5lajE5ODMvY2hlc3MtZW5naW5lLXhcIlxuICB9LFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcImNoZXNzXCIsXG4gICAgXCJnYW1lXCIsXG4gICAgXCJlbmdpbmVcIixcbiAgICBcImphdmFzY3JpcHRcIlxuICBdLFxuICBcImF1dGhvclwiOiBcIkpvbmF0aGFuIFd5bm5lIDx3eW5uZWoxOTgzQGdtYWlsLmNvbT5cIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwiYnVnc1wiOiB7XG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vd3lubmVqMTk4My9jaGVzcy1lbmdpbmUteC9pc3N1ZXNcIlxuICB9LFxuICBcImhvbWVwYWdlXCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3d5bm5lajE5ODMvY2hlc3MtZW5naW5lLXhcIixcbiAgXCJkZXBlbmRlbmNpZXNcIjoge1xuICAgIFwibG9kYXNoXCI6IFwiXjIuNC4xXCJcbiAgfVxufVxuIl19
