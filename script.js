'use strict';

let scores, roundScore, activePlayer, gamePlaying, lastDice;

init();

document.querySelector('.btn--roll').addEventListener('click', () => {
  if (gamePlaying) {
    // random number
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;

    // display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
   
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    if (dice1 !== 1 && dice2 !== 1) {
      // add score
      roundScore += dice1 + dice2;
      document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer()
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

    let input = document.querySelector('.final-score').value;
    let winningScore;
    // check if underfined, 0, null or '' are coerced to false
    if(input) {
      winningScore = input
    } else {
      winningScore = 100
    }

    // Check if player won a game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
       document.getElementById('dice-1').style.display = 'none';
       document.getElementById('dice-2').style.display = 'none';
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
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}
document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
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