'use strict';

const views = (function views() {
  return {
    Welcome: {
      say: 'Welcome to Rock Paper Scissors!',
    },
    AskHowManyWins: {
      ask: 'How many times do I have to beat you in rock paper scissors to be the ultimate winner?',
    },
    StartGame: {
      say: 'All right, let\'s start.',
    },
    AskUserChoice: {
      ask: 'I made my choice already, what\'s your choice? rock, paper or scissors?',
      reprompt: 'what\'s your choice? rock, paper or scissors?',
    },
    TiedResult: {
      say: 'Oh! we tied on this one. Great minds think alike, they say. I\'ll beat you in the next round.',
    },
    UserWins: {
      say: 'Oh, you won this point! You have {userWins} wins and I have {alexaWins} wins.',
    },
    AlexaWins: {
      say: 'I won this point! You have {userWins} wins and I have {alexaWins} wins.',
    },
    UserWinsTheGame: {
      say: 'You won the game! congratulations, it was a great match.',
    },
    AlexaWinsTheGame: {
      say: 'I won the game!.',
    },
    AskIfStartANewGame: {
      ask: 'Should we play again?',
      reprompt: 'Should we play again?',
    },
    RestartGame: {
      say: 'All right!',
    },
    Bye: {
      tell: 'That\'s all right, until next time!',
    },
  };
}());
module.exports = views;
