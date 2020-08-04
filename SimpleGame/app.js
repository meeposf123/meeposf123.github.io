/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var roundScore, activePlayer, gameState, scores, winningScore;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gameState){
  var dice = Math.floor((Math.random() * 6) + 1);
  var diceClass= document.querySelector('.dice');
  diceClass.src = 'dice-' + dice + '.png';
  diceClass.style.display = "block";
  if(dice === 1){
    roundScore = 0;
    scores[activePlayer] += roundScore;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
    toggleTurn();
  }
  else{
    roundScore += dice;
  }
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
}
});
document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gameState){
  scores[activePlayer] += roundScore;
  if(scores[activePlayer] >= winningScore){
    document.getElementById('name-' + activePlayer).textContent = 'Winner';
    gameState = false;
    document.querySelector('.final-score').setAttribute("type", "number");
  }
  document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
  roundScore = 0;
  toggleTurn();
}
});

document.querySelector('.btn-new').addEventListener('click', newGame);

function toggleTurn(){
  if(gameState){
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-' + activePlayer + '-panel').classList.toggle('active');
}
else{
  document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
}
}

function newGame(){
  roundScore = 0, activePlayer = 0;
  scores = [0, 0];
  document.querySelector('.player-1-panel').classList.remove('active');
  document.getElementById('name-1').textContent = 'Player 2';
  document.getElementById('name-0').textContent = 'Player 1';
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.dice').style.display = "none";
  document.querySelector('#current-0').textContent = roundScore;
  document.getElementById('score-0').textContent = scores[activePlayer];
  document.querySelector('#current-1').textContent = roundScore;
  document.getElementById('score-1').textContent = scores[activePlayer];
  var finalScoreClass = document.querySelector('.final-score');
  winningScore = finalScoreClass.value;
  winningScore = Math.floor(winningScore);
  if(typeof winningScore === 'number' && winningScore >= 20){
    finalScoreClass.setAttribute("type", "hidden");
    gameState = true;
  }
  else{
    alert('Enter a valid number greater than 19!');
  }
}
