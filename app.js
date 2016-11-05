(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Suits = ['♠', '♣', '♥', '♦'];
var Ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

var Card = function () {
  function Card(rank, suit) {
    _classCallCheck(this, Card);

    this.rank = rank;
    this.suit = suit;
  }

  _createClass(Card, [{
    key: 'getRank',
    value: function getRank() {
      return this.rank;
    }
  }, {
    key: 'getSuit',
    value: function getSuit() {
      return this.suit;
    }
  }, {
    key: 'toString',
    value: function toString() {
      return this.rank + this.suit;
    }
  }, {
    key: 'rankScore',
    value: function rankScore() {
      return Ranks.scores[this.rank];
    }
  }, {
    key: 'suitPosition',
    value: function suitPosition() {
      return Suits.indexOf(this.suit);
    }
  }]);

  return Card;
}();

exports.default = Card;


function initCards() {
  var rankScores = {};

  Card.types = {};

  Ranks.forEach(function (r, i) {
    rankScores[r] = i + 2;

    Suits.forEach(function (s) {
      var cardName = '_' + r + s;
      Card.types[cardName] = new Card(r, s);
    });
  });

  Ranks.scores = rankScores;
}

initCards();

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _card = require('./card');

var _card2 = _interopRequireDefault(_card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Deck = function () {
  function Deck(cards) {
    _classCallCheck(this, Deck);

    this.cards = cards;
    this.nextToDeal = 0;
  }

  _createClass(Deck, [{
    key: 'deal',
    value: function deal(count) {
      var result = this.cards.slice(this.nextToDeal, this.nextToDeal + count);
      this.nextToDeal += count;
      return result;
    }
  }], [{
    key: 'random',
    value: function random() {
      var shuffle = function shuffle(array) {
        var currentIndex = array.length;
        var randomIndex = void 0;

        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          var _ref = [array[randomIndex], array[currentIndex]];
          array[currentIndex] = _ref[0];
          array[randomIndex] = _ref[1];
        }

        return array;
      };

      var keys = Object.keys(_card2.default.types);
      var shuffled = shuffle(keys);
      var cards = [];

      shuffled.forEach(function (key) {
        cards.push(_card2.default.types[key]);
      });

      return new Deck(cards);
    }
  }]);

  return Deck;
}();

exports.default = Deck;

},{"./card":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _hand_type = require('./hand_type');

var _hand_type2 = _interopRequireDefault(_hand_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Hand = function () {
  function Hand(cards) {
    var owner = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Richard Hendricks';

    _classCallCheck(this, Hand);

    this.cards = cards;
    this.owner = owner;
  }

  _createClass(Hand, [{
    key: 'toString',
    value: function toString() {
      var result = '';

      this.cards.forEach(function (card) {
        result += card.toString() + ' ';
      });

      return result;
    }
  }, {
    key: 'toHTMLString',
    value: function toHTMLString() {
      var output = '<div class=\'info\'><h2>' + this.owner + '</h2><h3>' + this.getType() + '</h3></div><div class=\'hand\'>';

      this.cards.forEach(function (card) {
        output += '\n                <div class=\'card-container\'>\n                  <div class=\'flipper\'>\n                    <div class=\'front\'>\n                      <div class=\'pattern\'></div>\n                    </div>\n                    <div class=\'back\'>\n                      <div class=\'card ' + card.getSuit() + '\'>\n                        <div>' + card.getRank() + '</div>\n                      </div>\n                    </div>\n                  </div>\n                </div>';
      });

      output += '</div>';

      return output;
    }
  }, {
    key: 'getType',
    value: function getType() {
      var handType = new _hand_type2.default(this.cards);
      return handType.getType();
    }
  }, {
    key: 'getIndex',
    value: function getIndex() {
      var handType = new _hand_type2.default(this.cards);
      return handType.getIndex();
    }
  }]);

  return Hand;
}();

exports.default = Hand;

},{"./hand_type":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandType = function () {
  function HandType(cards) {
    var _this = this;

    _classCallCheck(this, HandType);

    this.cards = cards;
    this.values = [];
    this.suites = [];

    cards.forEach(function (card) {
      _this.values.push(card.rankScore());
      _this.suites.push(card.suitPosition());
    });
  }

  _createClass(HandType, [{
    key: 'getDuplicateCards',
    value: function getDuplicateCards() {
      var occurrencesFound = [];
      var result = '';
      for (var i = 0; i < this.values.length; i += 1) {
        var occurrences = this.occurrencesOf(this.values[i]);
        if (occurrences > 1 && occurrencesFound.indexOf(this.values[i]) === -1) {
          result += occurrences;
          occurrencesFound.push(this.values[i]);
        }
      }
      return result;
    }
  }, {
    key: 'occurrencesOf',
    value: function occurrencesOf(n) {
      var count = 0;
      var index = 0;
      while (index < this.values.length) {
        index = this.values.indexOf(n, index) + 1;
        if (index === 0) {
          break;
        } else {
          count += 1;
        }
      }
      return count;
    }
  }, {
    key: 'getLowest',
    value: function getLowest() {
      return Math.min.apply(Math, _toConsumableArray(this.values));
    }
  }, {
    key: 'getHighest',
    value: function getHighest() {
      return Math.max.apply(Math, _toConsumableArray(this.values));
    }
  }, {
    key: 'isFlush',
    value: function isFlush() {
      for (var i = 0; i < 4; i += 1) {
        if (this.values[i] !== this.values[i + 1]) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'isStraight',
    value: function isStraight() {
      var lowest = this.getLowest();
      for (var i = 1; i < 5; i += 1) {
        if (this.occurrencesOf(lowest + i) !== 1) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'isAceStraight',
    value: function isAceStraight() {
      var lowest = 9;
      for (var i = 1; i < 4; i += 1) {
        if (this.occurrencesOf(lowest + i) !== 1) {
          return false;
        }
      }
      return this.occurrencesOf(1) === 0;
    }
  }, {
    key: 'getType',
    value: function getType() {
      var result = '';

      switch (this.getDuplicateCards()) {
        case '2':
          result = HandType.RESULTS[8]; // One pair
          break;
        case '22':
          result = HandType.RESULTS[7]; // Two pairs
          break;
        case '3':
          result = HandType.RESULTS[6]; // Three of a Kind
          break;
        case '23':
        case '32':
          result = HandType.RESULTS[2]; // Full House
          break;
        case '4':
          result = HandType.RESULTS[1]; // Four of a King
          break;
        default:
          if (this.isStraight()) {
            result = HandType.RESULTS[5]; // Straight
          }
          if (this.isAceStraight()) {
            result = HandType.RESULTS[4]; // Ace Straight
          }
          break;
      }
      if (this.isFlush()) {
        if (result) {
          result = HandType.RESULTS[0]; // Straight Flush
        } else {
          result = HandType.RESULTS[3]; // Flush
        }
      }
      if (!result) {
        result = HandType.RESULTS[9]; // High Card
      }
      return result;
    }
  }, {
    key: 'getIndex',
    value: function getIndex() {
      var type = this.getType();
      return HandType.RESULTS.indexOf(type);
    }
  }], [{
    key: 'RESULTS',
    get: function get() {
      // I am not a poker guy. Not sure if this is the correct order
      return ['Straight Flush', 'Four of a Kind', 'Full House', 'Flush', 'Ace Straight', 'Straight', 'Three of a Kind', 'Two pairs', 'One pair', 'High Card'];
    }
  }]);

  return HandType;
}();

exports.default = HandType;

},{}],5:[function(require,module,exports){
'use strict';

var _poker = require('./poker');

var _poker2 = _interopRequireDefault(_poker);

var _deck = require('./deck');

var _deck2 = _interopRequireDefault(_deck);

var _hand = require('./hand');

var _hand2 = _interopRequireDefault(_hand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startGame = function startGame() {
  // Cards on the table
  var deck = _deck2.default.random();

  var handJoe = new _hand2.default(deck.deal(5), 'Joe');
  var handBob = new _hand2.default(deck.deal(5), 'Bob');
  var handSally = new _hand2.default(deck.deal(5), 'Sally');
  var poker = new _poker2.default(handJoe, handBob, handSally);
  var winner = poker.getWinner();

  // UI content
  var container = document.querySelector('.container');

  var contentWinner = document.createElement('div');
  contentWinner.classList.add('winner');
  contentWinner.innerHTML = winner;
  container.appendChild(contentWinner);

  var contentJoe = document.createElement('div');
  contentJoe.classList.add('row');
  contentJoe.innerHTML = handJoe.toHTMLString();
  container.appendChild(contentJoe);

  var contentBob = document.createElement('div');
  contentBob.classList.add('row');
  contentBob.innerHTML = handBob.toHTMLString();
  container.appendChild(contentBob);

  var contentSally = document.createElement('div');
  contentSally.classList.add('row');
  contentSally.innerHTML = handSally.toHTMLString();
  container.appendChild(contentSally);

  // UI listeners
  var hands = document.querySelectorAll('.hand');

  hands.forEach(function (hand) {
    var cards = hand.querySelectorAll('.card-container');

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        card.classList.toggle('visible');
      });
    });
  });

  var playAgain = document.querySelector('.play-again');
  playAgain.addEventListener('click', function () {
    container.innerHTML = '';
    startGame();
  });

  setTimeout(function () {
    hands.forEach(function (hand) {
      var cards = hand.querySelectorAll('.card-container');

      cards.forEach(function (card, index) {
        setTimeout(function () {
          card.classList.add('visible');
        }, index * 400);
      });
    });
  }, 2250);
};

document.addEventListener('DOMContentLoaded', function () {
  startGame();
});

},{"./deck":2,"./hand":3,"./poker":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Poker = function () {
  function Poker() {
    _classCallCheck(this, Poker);

    for (var _len = arguments.length, hands = Array(_len), _key = 0; _key < _len; _key++) {
      hands[_key] = arguments[_key];
    }

    this.hands = hands;
  }

  _createClass(Poker, [{
    key: 'getWinner',
    value: function getWinner() {
      var indexes = [];
      // Store in an array the indexes of the type of hand,
      // which better hands have lower numbers
      this.hands.forEach(function (hand) {
        indexes.push(hand.getIndex());
      });

      // Get the lowest element
      var min = Math.min.apply(Math, indexes);

      // Find who is the big boss
      var winners = [];
      this.hands.forEach(function (hand) {
        if (hand.getIndex() === min) {
          winners.push(hand.owner);
        }
      });

      var result = void 0;
      if (winners.length > 1) {
        result = 'Tie: ' + winners.join(', ');
      } else {
        result = '<div>\uD83C\uDFC6</div>' + winners[0];
      }

      return result;
    }
  }]);

  return Poker;
}();

exports.default = Poker;

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvY2FyZC5qcyIsInNyYy9qcy9kZWNrLmpzIiwic3JjL2pzL2hhbmQuanMiLCJzcmMvanMvaGFuZF90eXBlLmpzIiwic3JjL2pzL2luZGV4LmpzIiwic3JjL2pzL3Bva2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7OztBQ0FBLElBQU0sUUFBUSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixDQUFkO0FBQ0EsSUFBTSxRQUFRLENBQUMsR0FBRCxFQUFNLEdBQU4sRUFBVyxHQUFYLEVBQWdCLEdBQWhCLEVBQXFCLEdBQXJCLEVBQTBCLEdBQTFCLEVBQStCLEdBQS9CLEVBQW9DLEdBQXBDLEVBQXlDLElBQXpDLEVBQStDLEdBQS9DLEVBQW9ELEdBQXBELEVBQXlELEdBQXpELEVBQThELEdBQTlELENBQWQ7O0lBRXFCLEk7QUFFbkIsZ0JBQVksSUFBWixFQUFrQixJQUFsQixFQUF3QjtBQUFBOztBQUN0QixTQUFLLElBQUwsR0FBWSxJQUFaO0FBQ0EsU0FBSyxJQUFMLEdBQVksSUFBWjtBQUNEOzs7OzhCQUVTO0FBQ1IsYUFBTyxLQUFLLElBQVo7QUFDRDs7OzhCQUVTO0FBQ1IsYUFBTyxLQUFLLElBQVo7QUFDRDs7OytCQUVVO0FBQ1QsYUFBTyxLQUFLLElBQUwsR0FBWSxLQUFLLElBQXhCO0FBQ0Q7OztnQ0FFVztBQUNWLGFBQU8sTUFBTSxNQUFOLENBQWEsS0FBSyxJQUFsQixDQUFQO0FBQ0Q7OzttQ0FFYztBQUNiLGFBQU8sTUFBTSxPQUFOLENBQWMsS0FBSyxJQUFuQixDQUFQO0FBQ0Q7Ozs7OztrQkF6QmtCLEk7OztBQTZCckIsU0FBUyxTQUFULEdBQXFCO0FBQ25CLE1BQU0sYUFBYSxFQUFuQjs7QUFFQSxPQUFLLEtBQUwsR0FBYSxFQUFiOztBQUVBLFFBQU0sT0FBTixDQUFjLFVBQUMsQ0FBRCxFQUFJLENB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OztJQ3ZFcUIsSztBQUVuQixtQkFBc0I7QUFBQTs7QUFBQSxzQ0FBUCxLQUFPO0FBQVAsV0FBTztBQUFBOztBQUNwQixTQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0Q7Ozs7Z0NBRVc7QUFDVixVQUFNLFVBQVUsRUFBaEI7QUFDQTtBQUNBO0FBQ0EsV0FBSyxLQUFMLENBQVcsT0FBWCxDQUFtQixVQUFDLElBQUQsRUFBVTtBQUMzQixnQkFBUSxJQUFSLENBQWEsS0FBSyxRQUFMLEVBQWI7QUFDRCxPQUZEOztBQUlBO0FBQ0EsVUFBTSxNQUFNLEtBQUssR0FBTCxhQUFZLE9BQVosQ0FBWjs7QUFFQTtBQUNBLFVBQU0sVUFBVSxFQUFoQjtBQUNBLFdBQUssS0FBTCxDQUFXLE9BQVgsQ0FBbUIsVUFBQyxJQUFELEVBQVU7QUFDM0IsWUFBSSxLQUFLLFFBQUwsT0FBb0IsR0FBeEIsRUFBNkI7QUFDM0Isa0JBQVEsSUFBUixDQUFhLEtBQUssS0FBbEI7QUFDRDtBQUNGLE9BSkQ7O0FBTUEsVUFBSSxlQUFKO0FBQ0EsVUFBSSxRQUFRLE1BQVIsR0FBaUIsQ0FBckIsRUFBd0I7QUFDdEIsMkJBQWlCLFFBQVEsSUFBUixDQUFhLElBQWIsQ0FBakI7QUFDRCxPQUZELE1BRU87QUFDTCw2Q0FBeUIsUUFBUSxDQUFSLENBQXpCO0FBQ0Q7O0FBRUQsYUFBTyxNQUFQO0FBQ0Q7Ozs7OztrQkFqQ2tCLEsiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY29uc3QgU3VpdHMgPSBbJ+KZoCcsICfimaMnLCAn4pmlJywgJ+KZpiddO1xuY29uc3QgUmFua3MgPSBbJzInLCAnMycsICc0JywgJzUnLCAnNicsICc3JywgJzgnLCAnOScsICcxMCcsICdKJywgJ1EnLCAnSycsICdBJ107XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcmQge1xuXG4gIGNvbnN0cnVjdG9yKHJhbmssIHN1aXQpIHtcbiAgICB0aGlzLnJhbmsgPSByYW5rO1xuICAgIHRoaXMuc3VpdCA9IHN1aXQ7XG4gIH1cblxuICBnZXRSYW5rKCkge1xuICAgIHJldHVybiB0aGlzLnJhbms7XG4gIH1cblxuICBnZXRTdWl0KCkge1xuICAgIHJldHVybiB0aGlzLnN1aXQ7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5yYW5rICsgdGhpcy5zdWl0O1xuICB9XG5cbiAgcmFua1Njb3JlKCkge1xuICAgIHJldHVybiBSYW5rcy5zY29yZXNbdGhpcy5yYW5rXTtcbiAgfVxuXG4gIHN1aXRQb3NpdGlvbigpIHtcbiAgICByZXR1cm4gU3VpdHMuaW5kZXhPZih0aGlzLnN1aXQpO1xuICB9XG5cbn1cblxuZnVuY3Rpb24gaW5pdENhcmRzKCkge1xuICBjb25zdCByYW5rU2NvcmVzID0ge307XG5cbiAgQ2FyZC50eXBlcyA9IHt9O1xuXG4gIFJhbmtzLmZvckVhY2goKHIsIGkpID0+IHtcbiAgICByYW5rU2NvcmVzW3JdID0gaSArIDI7XG5cbiAgICBTdWl0cy5mb3JFYWNoKChzKSA9PiB7XG4gICAgICBjb25zdCBjYXJkTmFtZSA9IGBfJHtyfSR7c31gO1xuICAgICAgQ2FyZC50eXBlc1tjYXJkTmFtZV0gPSBuZXcgQ2FyZChyLCBzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgUmFua3Muc2NvcmVzID0gcmFua1Njb3Jlcztcbn1cblxuaW5pdENhcmRzKCk7XG4iLCJpbXBvcnQgQ2FyZCBmcm9tICcuL2NhcmQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEZWNrIHtcblxuICBjb25zdHJ1Y3RvcihjYXJkcykge1xuICAgIHRoaXMuY2FyZHMgPSBjYXJkcztcbiAgICB0aGlzLm5leHRUb0RlYWwgPSAwO1xuICB9XG5cbiAgZGVhbChjb3VudCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IHRoaXMuY2FyZHMuc2xpY2UodGhpcy5uZXh0VG9EZWFsLCB0aGlzLm5leHRUb0RlYWwgKyBjb3VudCk7XG4gICAgdGhpcy5uZXh0VG9EZWFsICs9IGNvdW50O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBzdGF0aWMgcmFuZG9tKCkge1xuICAgIGNvbnN0IHNodWZmbGUgPSAoYXJyYXkpID0+IHtcbiAgICAgIGxldCBjdXJyZW50SW5kZXggPSBhcnJheS5sZW5ndGg7XG4gICAgICBsZXQgcmFuZG9tSW5kZXg7XG5cbiAgICAgIHdoaWxlIChjdXJyZW50SW5kZXggIT09IDApIHtcbiAgICAgICAgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjdXJyZW50SW5kZXgpO1xuICAgICAgICBjdXJyZW50SW5kZXggLT0gMTtcblxuICAgICAgICBbYXJyYXlbY3VycmVudEluZGV4XSwgYXJyYXlbcmFuZG9tSW5kZXhdXSA9IFthcnJheVtyYW5kb21JbmRleF0sIGFycmF5W2N1cnJlbnRJbmRleF1dO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYXJyYXk7XG4gICAgfTtcblxuICAgIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyhDYXJkLnR5cGVzKTtcbiAgICBjb25zdCBzaHVmZmxlZCA9IHNodWZmbGUoa2V5cyk7XG4gICAgY29uc3QgY2FyZHMgPSBbXTtcblxuICAgIHNodWZmbGVkLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY2FyZHMucHVzaChDYXJkLnR5cGVzW2tleV0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBEZWNrKGNhcmRzKTtcbiAgfVxufVxuIiwiaW1wb3J0IEhhbmRUeXBlIGZyb20gJy4vaGFuZF90eXBlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSGFuZCB7XG5cbiAgY29uc3RydWN0b3IoY2FyZHMsIG93bmVyID0gJ1JpY2hhcmQgSGVuZHJpY2tzJykge1xuICAgIHRoaXMuY2FyZHMgPSBjYXJkcztcbiAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gIH1cblxuICB0b1N0cmluZygpIHtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgICB0aGlzLmNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgIHJlc3VsdCArPSBgJHtjYXJkLnRvU3RyaW5nKCl9IGA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgdG9IVE1MU3RyaW5nKCkge1xuICAgIGxldCBvdXRwdXQgPSBgPGRpdiBjbGFzcz0naW5mbyc+PGgyPiR7dGhpcy5vd25lcn08L2gyPjxoMz4ke3RoaXMuZ2V0VHlwZSgpfTwvaDM+PC9kaXY+PGRpdiBjbGFzcz0naGFuZCc+YDtcblxuICAgIHRoaXMuY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgb3V0cHV0ICs9IGBcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdjYXJkLWNvbnRhaW5lcic+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPSdmbGlwcGVyJz5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nZnJvbnQnPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9J3BhdHRlcm4nPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nYmFjayc+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz0nY2FyZCAke2NhcmQuZ2V0U3VpdCgpfSc+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PiR7Y2FyZC5nZXRSYW5rKCl9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcbiAgICB9KTtcblxuICAgIG91dHB1dCArPSAnPC9kaXY+JztcblxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICBnZXRUeXBlKCkge1xuICAgIGNvbnN0IGhhbmRUeXBlID0gbmV3IEhhbmRUeXBlKHRoaXMuY2FyZHMpO1xuICAgIHJldHVybiBoYW5kVHlwZS5nZXRUeXBlKCk7XG4gIH1cblxuICBnZXRJbmRleCgpIHtcbiAgICBjb25zdCBoYW5kVHlwZSA9IG5ldyBIYW5kVHlwZSh0aGlzLmNhcmRzKTtcbiAgICByZXR1cm4gaGFuZFR5cGUuZ2V0SW5kZXgoKTtcbiAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBIYW5kVHlwZSB7XG5cbiAgY29uc3RydWN0b3IoY2FyZHMpIHtcbiAgICB0aGlzLmNhcmRzID0gY2FyZHM7XG4gICAgdGhpcy52YWx1ZXMgPSBbXTtcbiAgICB0aGlzLnN1aXRlcyA9IFtdO1xuXG4gICAgY2FyZHMuZm9yRWFjaCgoY2FyZCkgPT4ge1xuICAgICAgdGhpcy52YWx1ZXMucHVzaChjYXJkLnJhbmtTY29yZSgpKTtcbiAgICAgIHRoaXMuc3VpdGVzLnB1c2goY2FyZC5zdWl0UG9zaXRpb24oKSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0IFJFU1VMVFMoKSB7XG4gICAgLy8gSSBhbSBub3QgYSBwb2tlciBndXkuIE5vdCBzdXJlIGlmIHRoaXMgaXMgdGhlIGNvcnJlY3Qgb3JkZXJcbiAgICByZXR1cm4gWydTdHJhaWdodCBGbHVzaCcsICdGb3VyIG9mIGEgS2luZCcsICdGdWxsIEhvdXNlJywgJ0ZsdXNoJywgJ0FjZSBTdHJhaWdodCcsICdTdHJhaWdodCcsICdUaHJlZSBvZiBhIEtpbmQnLCAnVHdvIHBhaXJzJywgJ09uZSBwYWlyJywgJ0hpZ2ggQ2FyZCddO1xuICB9XG5cbiAgZ2V0RHVwbGljYXRlQ2FyZHMoKSB7XG4gICAgY29uc3Qgb2NjdXJyZW5jZXNGb3VuZCA9IFtdO1xuICAgIGxldCByZXN1bHQgPSAnJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmFsdWVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBvY2N1cnJlbmNlcyA9IHRoaXMub2NjdXJyZW5jZXNPZih0aGlzLnZhbHVlc1tpXSk7XG4gICAgICBpZiAob2NjdXJyZW5jZXMgPiAxICYmIG9jY3VycmVuY2VzRm91bmQuaW5kZXhPZih0aGlzLnZhbHVlc1tpXSkgPT09IC0xKSB7XG4gICAgICAgIHJlc3VsdCArPSBvY2N1cnJlbmNlcztcbiAgICAgICAgb2NjdXJyZW5jZXNGb3VuZC5wdXNoKHRoaXMudmFsdWVzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIG9jY3VycmVuY2VzT2Yobikge1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgbGV0IGluZGV4ID0gMDtcbiAgICB3aGlsZSAoaW5kZXggPCB0aGlzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgIGluZGV4ID0gdGhpcy52YWx1ZXMuaW5kZXhPZihuLCBpbmRleCkgKyAxO1xuICAgICAgaWYgKGluZGV4ID09PSAwKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgZ2V0TG93ZXN0KCkge1xuICAgIHJldHVybiBNYXRoLm1pbiguLi50aGlzLnZhbHVlcyk7XG4gIH1cblxuICBnZXRIaWdoZXN0KCkge1xuICAgIHJldHVybiBNYXRoLm1heCguLi50aGlzLnZhbHVlcyk7XG4gIH1cblxuICBpc0ZsdXNoKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZXNbaV0gIT09IHRoaXMudmFsdWVzW2kgKyAxXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaXNTdHJhaWdodCgpIHtcbiAgICBjb25zdCBsb3dlc3QgPSB0aGlzLmdldExvd2VzdCgpO1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNTsgaSArPSAxKSB7XG4gICAgICBpZiAodGhpcy5vY2N1cnJlbmNlc09mKGxvd2VzdCArIGkpICE9PSAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpc0FjZVN0cmFpZ2h0KCkge1xuICAgIGNvbnN0IGxvd2VzdCA9IDk7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA0OyBpICs9IDEpIHtcbiAgICAgIGlmICh0aGlzLm9jY3VycmVuY2VzT2YobG93ZXN0ICsgaSkgIT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5vY2N1cnJlbmNlc09mKDEpID09PSAwO1xuICB9XG5cbiAgZ2V0VHlwZSgpIHtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG5cbiAgICBzd2l0Y2ggKHRoaXMuZ2V0RHVwbGljYXRlQ2FyZHMoKSkge1xuICAgICAgY2FzZSAnMic6XG4gICAgICAgIHJlc3VsdCA9IEhhbmRUeXBlLlJFU1VMVFNbOF07IC8vIE9uZSBwYWlyXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnMjInOlxuICAgICAgICByZXN1bHQgPSBIYW5kVHlwZS5SRVNVTFRTWzddOyAvLyBUd28gcGFpcnNcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICczJzpcbiAgICAgICAgcmVzdWx0ID0gSGFuZFR5cGUuUkVTVUxUU1s2XTsgLy8gVGhyZWUgb2YgYSBLaW5kXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnMjMnOlxuICAgICAgY2FzZSAnMzInOlxuICAgICAgICByZXN1bHQgPSBIYW5kVHlwZS5SRVNVTFRTWzJdOyAvLyBGdWxsIEhvdXNlXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnNCc6XG4gICAgICAgIHJlc3VsdCA9IEhhbmRUeXBlLlJFU1VMVFNbMV07IC8vIEZvdXIgb2YgYSBLaW5nXG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKHRoaXMuaXNTdHJhaWdodCgpKSB7XG4gICAgICAgICAgcmVzdWx0ID0gSGFuZFR5cGUuUkVTVUxUU1s1XTsgLy8gU3RyYWlnaHRcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc0FjZVN0cmFpZ2h0KCkpIHtcbiAgICAgICAgICByZXN1bHQgPSBIYW5kVHlwZS5SRVNVTFRTWzRdOyAvLyBBY2UgU3RyYWlnaHRcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHRoaXMuaXNGbHVzaCgpKSB7XG4gICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgIHJlc3VsdCA9IEhhbmRUeXBlLlJFU1VMVFNbMF07IC8vIFN0cmFpZ2h0IEZsdXNoXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQgPSBIYW5kVHlwZS5SRVNVTFRTWzNdOyAvLyBGbHVzaFxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmVzdWx0ID0gSGFuZFR5cGUuUkVTVUxUU1s5XTsgLy8gSGlnaCBDYXJkXG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBnZXRJbmRleCgpIHtcbiAgICBjb25zdCB0eXBlID0gdGhpcy5nZXRUeXBlKCk7XG4gICAgcmV0dXJuIEhhbmRUeXBlLlJFU1VMVFMuaW5kZXhPZih0eXBlKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgUG9rZXIgZnJvbSAnLi9wb2tlcic7XG5pbXBvcnQgRGVjayBmcm9tICcuL2RlY2snO1xuaW1wb3J0IEhhbmQgZnJvbSAnLi9oYW5kJztcblxuY29uc3Qgc3RhcnRHYW1lID0gKCkgPT4ge1xuICAvLyBDYXJkcyBvbiB0aGUgdGFibGVcbiAgY29uc3QgZGVjayA9IERlY2sucmFuZG9tKCk7XG5cblxuICBjb25zdCBoYW5kSm9lID0gbmV3IEhhbmQoZGVjay5kZWFsKDUpLCAnSm9lJyk7XG4gIGNvbnN0IGhhbmRCb2IgPSBuZXcgSGFuZChkZWNrLmRlYWwoNSksICdCb2InKTtcbiAgY29uc3QgaGFuZFNhbGx5ID0gbmV3IEhhbmQoZGVjay5kZWFsKDUpLCAnU2FsbHknKTtcbiAgY29uc3QgcG9rZXIgPSBuZXcgUG9rZXIoaGFuZEpvZSwgaGFuZEJvYiwgaGFuZFNhbGx5KTtcbiAgY29uc3Qgd2lubmVyID0gcG9rZXIuZ2V0V2lubmVyKCk7XG5cbiAgLy8gVUkgY29udGVudFxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGFpbmVyJyk7XG5cbiAgY29uc3QgY29udGVudFdpbm5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250ZW50V2lubmVyLmNsYXNzTGlzdC5hZGQoJ3dpbm5lcicpO1xuICBjb250ZW50V2lubmVyLmlubmVySFRNTCA9IHdpbm5lcjtcbiAgY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRlbnRXaW5uZXIpO1xuXG4gIGNvbnN0IGNvbnRlbnRKb2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGVudEpvZS5jbGFzc0xpc3QuYWRkKCdyb3cnKTtcbiAgY29udGVudEpvZS5pbm5lckhUTUwgPSBoYW5kSm9lLnRvSFRNTFN0cmluZygpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudEpvZSk7XG5cbiAgY29uc3QgY29udGVudEJvYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICBjb250ZW50Qm9iLmNsYXNzTGlzdC5hZGQoJ3JvdycpO1xuICBjb250ZW50Qm9iLmlubmVySFRNTCA9IGhhbmRCb2IudG9IVE1MU3RyaW5nKCk7XG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250ZW50Qm9iKTtcblxuICBjb25zdCBjb250ZW50U2FsbHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29udGVudFNhbGx5LmNsYXNzTGlzdC5hZGQoJ3JvdycpO1xuICBjb250ZW50U2FsbHkuaW5uZXJIVE1MID0gaGFuZFNhbGx5LnRvSFRNTFN0cmluZygpO1xuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudFNhbGx5KTtcblxuXG4gIC8vIFVJIGxpc3RlbmVyc1xuICBjb25zdCBoYW5kcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5oYW5kJyk7XG5cbiAgaGFuZHMuZm9yRWFjaCgoaGFuZCkgPT4ge1xuICAgIGNvbnN0IGNhcmRzID0gaGFuZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZC1jb250YWluZXInKTtcblxuICAgIGNhcmRzLmZvckVhY2goKGNhcmQpID0+IHtcbiAgICAgIGNhcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIGNhcmQuY2xhc3NMaXN0LnRvZ2dsZSgndmlzaWJsZScpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IHBsYXlBZ2FpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5LWFnYWluJyk7XG4gIHBsYXlBZ2Fpbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgc3RhcnRHYW1lKCk7XG4gIH0pO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGhhbmRzLmZvckVhY2goKGhhbmQpID0+IHtcbiAgICAgIGNvbnN0IGNhcmRzID0gaGFuZC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZC1jb250YWluZXInKTtcblxuICAgICAgY2FyZHMuZm9yRWFjaCgoY2FyZCwgaW5kZXgpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgY2FyZC5jbGFzc0xpc3QuYWRkKCd2aXNpYmxlJyk7XG4gICAgICAgIH0sIGluZGV4ICogNDAwKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9LCAyMjUwKTtcbn07XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIHN0YXJ0R2FtZSgpO1xufSk7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQb2tlciB7XG5cbiAgY29uc3RydWN0b3IoLi4uaGFuZHMpIHtcbiAgICB0aGlzLmhhbmRzID0gaGFuZHM7XG4gIH1cblxuICBnZXRXaW5uZXIoKSB7XG4gICAgY29uc3QgaW5kZXhlcyA9IFtdO1xuICAgIC8vIFN0b3JlIGluIGFuIGFycmF5IHRoZSBpbmRleGVzIG9mIHRoZSB0eXBlIG9mIGhhbmQsXG4gICAgLy8gd2hpY2ggYmV0dGVyIGhhbmRzIGhhdmUgbG93ZXIgbnVtYmVyc1xuICAgIHRoaXMuaGFuZHMuZm9yRWFjaCgoaGFuZCkgPT4ge1xuICAgICAgaW5kZXhlcy5wdXNoKGhhbmQuZ2V0SW5kZXgoKSk7XG4gICAgfSk7XG5cbiAgICAvLyBHZXQgdGhlIGxvd2VzdCBlbGVtZW50XG4gICAgY29uc3QgbWluID0gTWF0aC5taW4oLi4uaW5kZXhlcyk7XG5cbiAgICAvLyBGaW5kIHdobyBpcyB0aGUgYmlnIGJvc3NcbiAgICBjb25zdCB3aW5uZXJzID0gW107XG4gICAgdGhpcy5oYW5kcy5mb3JFYWNoKChoYW5kKSA9PiB7XG4gICAgICBpZiAoaGFuZC5nZXRJbmRleCgpID09PSBtaW4pIHtcbiAgICAgICAgd2lubmVycy5wdXNoKGhhbmQub3duZXIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGV0IHJlc3VsdDtcbiAgICBpZiAod2lubmVycy5sZW5ndGggPiAxKSB7XG4gICAgICByZXN1bHQgPSBgVGllOiAke3dpbm5lcnMuam9pbignLCAnKX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSBgPGRpdj7wn4+GPC9kaXY+JHt3aW5uZXJzWzBdfWA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG59XG4iXX0=
