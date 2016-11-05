const Suits = ['♠', '♣', '♥', '♦'];
const Ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export default class Card {

  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getRank() {
    return this.rank;
  }

  getSuit() {
    return this.suit;
  }

  toString() {
    return this.rank + this.suit;
  }

  rankScore() {
    return Ranks.scores[this.rank];
  }

  suitPosition() {
    return Suits.indexOf(this.suit);
  }

}

function initCards() {
  const rankScores = {};

  Card.types = {};

  Ranks.forEach((r, i) => {
    rankScores[r] = i + 2;

    Suits.forEach((s) => {
      const cardName = `_${r}${s}`;
      Card.types[cardName] = new Card(r, s);
    });
  });

  Ranks.scores = rankScores;
}

initCards();
