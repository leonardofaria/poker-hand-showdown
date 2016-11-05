import HandType from './hand_type';

export default class Hand {

  constructor(cards, owner = 'Richard Hendricks') {
    this.cards = cards;
    this.owner = owner;
  }

  toString() {
    let result = '';

    this.cards.forEach((card) => {
      result += `${card.toString()} `;
    });

    return result;
  }

  toHTMLString() {
    let output = `<div class='info'><h2>${this.owner}</h2><h3>${this.getType()}</h3></div><div class='hand'>`;

    this.cards.forEach((card) => {
      output += `
                <div class='card-container'>
                  <div class='flipper'>
                    <div class='front'>
                      <div class='pattern'></div>
                    </div>
                    <div class='back'>
                      <div class='card ${card.getSuit()}'>
                        <div>${card.getRank()}</div>
                      </div>
                    </div>
                  </div>
                </div>`;
    });

    output += '</div>';

    return output;
  }

  getType() {
    const handType = new HandType(this.cards);
    return handType.getType();
  }

  getIndex() {
    const handType = new HandType(this.cards);
    return handType.getIndex();
  }

}
