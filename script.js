'use strict';

let scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn--roll').addEventListener('click', () => {
  if (gamePlaying) {
    // random number
    const dice = Math.floor(Math.random() * 6) + 1;

    // display the result
    const diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // update the round score if the rolled number was not a 1
    if (dice !== 1) {
     
      // add score
      roundScore += dice;
      document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

document.querySelector('.btn--hold').addEventListener('click', () => {
  if (gamePlaying) {

    // add current score to global score
    scores[activePlayer] += roundScore;

    // update UI
    document.querySelector('#score--' + activePlayer).textContent =
      scores[activePlayer];

    // Check if player won a game
    if (scores[activePlayer] >= 20) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document .querySelector('.player--' + activePlayer).classList.add('winner');
      document.querySelector('.player--' + activePlayer).classList.remove('player--active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {

  // next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  // set roundScore to 0
  roundScore = 0;

  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
  document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  // document.querySelector('.player--0').classList.remove('winner');
  // document.querySelector('.player--1').classList.remove('winner');
  // document.querySelector('.player--0').classList.remove('player--active');
  // document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
}