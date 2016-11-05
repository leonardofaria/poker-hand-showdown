import Poker from './poker';
import Deck from './deck';
import Hand from './hand';

const startGame = () => {
  // Cards on the table
  const deck = Deck.random();


  const handJoe = new Hand(deck.deal(5), 'Joe');
  const handBob = new Hand(deck.deal(5), 'Bob');
  const handSally = new Hand(deck.deal(5), 'Sally');
  const poker = new Poker(handJoe, handBob, handSally);
  const winner = poker.getWinner();

  // UI content
  const container = document.querySelector('.container');

  const contentWinner = document.createElement('div');
  contentWinner.classList.add('winner');
  contentWinner.innerHTML = winner;
  container.appendChild(contentWinner);

  const contentJoe = document.createElement('div');
  contentJoe.classList.add('row');
  contentJoe.innerHTML = handJoe.toHTMLString();
  container.appendChild(contentJoe);

  const contentBob = document.createElement('div');
  contentBob.classList.add('row');
  contentBob.innerHTML = handBob.toHTMLString();
  container.appendChild(contentBob);

  const contentSally = document.createElement('div');
  contentSally.classList.add('row');
  contentSally.innerHTML = handSally.toHTMLString();
  container.appendChild(contentSally);


  // UI listeners
  const hands = document.querySelectorAll('.hand');

  hands.forEach((hand) => {
    const cards = hand.querySelectorAll('.card-container');

    cards.forEach((card) => {
      card.addEventListener('click', () => {
        card.classList.toggle('visible');
      });
    });
  });

  const playAgain = document.querySelector('.play-again');
  playAgain.addEventListener('click', () => {
    container.innerHTML = '';
    startGame();
  });

  setTimeout(() => {
    hands.forEach((hand) => {
      const cards = hand.querySelectorAll('.card-container');

      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 400);
      });
    });
  }, 2250);
};

document.addEventListener('DOMContentLoaded', () => {
  startGame();
});
