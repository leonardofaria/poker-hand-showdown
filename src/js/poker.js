export default class Poker {

  constructor(...hands) {
    this.hands = hands;
  }

  getWinner() {
    const indexes = [];
    // Store in an array the indexes of the type of hand,
    // which better hands have lower numbers
    this.hands.forEach((hand) => {
      indexes.push(hand.getIndex());
    });

    // Get the lowest element
    const min = Math.min(...indexes);

    // Find who is the big boss
    const winners = [];
    this.hands.forEach((hand) => {
      if (hand.getIndex() === min) {
        winners.push(hand.owner);
      }
    });

    let result;
    if (winners.length > 1) {
      result = `Tie: ${winners.join(', ')}`;
    } else {
      result = `<div>🏆</div>${winners[0]}`;
    }

    return result;
  }

}
