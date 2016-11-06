# Poker Hand Showdown

Implement a library (in your language of choice) which evaluates who are the winner(s) among several 5 card poker hands.

Note for this project that you only need to implement a subset of the regular poker hands:

- Flush
- Three of a Kind
- One pair
- High Card

Input

Collection of players in the showdown.
- Player Name
- 5 Cards (each specifying the card rank and suit of the card)

Output

Collection of winning players (more than one in case of a tie)

Example

Input

- Joe, 3H, 4H, 5H, 6H, 8H
- Bob, 3C, 3D, 3S, 8C, 10D
- Sally, AC, 10C, 5C, 2S, 2C

Output

Joe


-----

## Demo

[Demo](http://leonardofaria.github.io/poker-hand-showdown)

- JS: The ES 6 code is transpiled to ES 5 using browserify and babelify. This project also uses Airbnb's ESLint.
- CSS: The UI is built using SASS

-----

## Installation

You will need to install [NodeJS](http://nodejs.org/).

```sh
# Clone the repository:
$ git clone git@github.com:leonardofaria/poker-hand-showdown.git
$ cd poker-hand-showdown

# Installs all the dependencies:
$ npm install && npm start

# Starts a local server on port 3000:
$ gulp
```
