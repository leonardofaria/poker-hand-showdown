export default class HandType {

  constructor(cards) {
    this.cards = cards;
    this.values = [];
    this.suites = [];

    cards.forEach((card) => {
      this.values.push(card.rankScore());
      this.suites.push(card.suitPosition());
    });
  }

  static get RESULTS() {
    // I am not a poker guy. Not sure if this is the correct order
    return ['Straight Flush', 'Four of a Kind', 'Full House', 'Flush', 'Ace Straight', 'Straight', 'Three of a Kind', 'Two pairs', 'One pair', 'High Card'];
  }

  getDuplicateCards() {
    const occurrencesFound = [];
    let result = '';
    for (let i = 0; i < this.values.length; i += 1) {
      const occurrences = this.occurrencesOf(this.values[i]);
      if (occurrences > 1 && occurrencesFound.indexOf(this.values[i]) === -1) {
        result += occurrences;
        occurrencesFound.push(this.values[i]);
      }
    }
    return result;
  }

  occurrencesOf(n) {
    let count = 0;
    let index = 0;
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

  getLowest() {
    return Math.min(...this.values);
  }

  getHighest() {
    return Math.max(...this.values);
  }

  isFlush() {
    for (let i = 0; i < 4; i += 1) {
      if (this.values[i] !== this.values[i + 1]) {
        return false;
      }
    }
    return true;
  }

  isStraight() {
    const lowest = this.getLowest();
    for (let i = 1; i < 5; i += 1) {
      if (this.occurrencesOf(lowest + i) !== 1) {
        return false;
      }
    }
    return true;
  }

  isAceStraight() {
    const lowest = 9;
    for (let i = 1; i < 4; i += 1) {
      if (this.occurrencesOf(lowest + i) !== 1) {
        return false;
      }
    }
    return this.occurrencesOf(1) === 0;
  }

  getType() {
    let result = '';

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

  getIndex() {
    const type = this.getType();
    return HandType.RESULTS.indexOf(type);
  }

}
