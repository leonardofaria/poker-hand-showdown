import Card from './card';

export default class Deck {

  constructor(cards) {
    this.cards = cards;
    this.nextToDeal = 0;
  }

  deal(count) {
    const result = this.cards.slice(this.nextToDeal, this.nextToDeal + count);
    this.nextToDeal += count;
    return result;
  }

  static random() {
    const shuffle = (array) => {
      let currentIndex = array.length;
      let randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
      }

      return array;
    };

    const keys = Object.keys(Card.types);
    const shuffled = shuffle(keys);
    const cards = [];

    shuffled.forEach((key) => {
      cards.push(Card.types[key]);
    });

    return new Deck(cards);
  }
}
