'use strict';

const CHOICES = ['rock', 'paper', 'scissors'];

exports.register = function register(skill) {
  skill.onIntent('LaunchIntent', () => {
    return { reply: 'Welcome', to: 'askHowManyWins' };
  });

  skill.onState('askHowManyWins', () => {
    return { reply: 'AskHowManyWins', to: 'getHowManyWins' };
  });

  skill.onState('getHowManyWins', (alexaEvent) => {
    if (alexaEvent.intent.name === 'MaxWinsIntent') {
      alexaEvent.model.wins = alexaEvent.intent.params.wins;
      alexaEvent.model.userWins = 0;
      alexaEvent.model.alexaWins = 0;
      return { reply: 'StartGame', to: 'askUserChoice' };
    }
  });

  skill.onState('askUserChoice', (alexaEvent) => {
    if (parseInt(alexaEvent.model.userWins) >= parseInt(alexaEvent.model.wins)) {
      return { reply: 'UserWinsTheGame', to: 'askIfStartANewGame' };
    }

    if (parseInt(alexaEvent.model.alexaWins) >= parseInt(alexaEvent.model.wins)) {
      return { reply: 'AlexaWinsTheGame', to: 'askIfStartANewGame' };
    }

    const min = 0;
    const max = CHOICES.length - 1;
    alexaEvent.model.userChoice = undefined;
    alexaEvent.model.alexaChoice = Math.floor(Math.random() * (max - min + 1)) + min;
    return { reply: 'AskUserChoice', to: 'getUserChoice' };
  });

  skill.onState('getUserChoice', (alexaEvent) => {
    if (alexaEvent.intent.name === 'RockIntent') {
      alexaEvent.model.userChoice = 'rock';
    } else if (alexaEvent.intent.name === 'PaperIntent') {
      alexaEvent.model.userChoice = 'paper';
    } else if (alexaEvent.intent.name === 'ScissorsIntent') {
      alexaEvent.model.userChoice = 'scissors';
    }

    if (alexaEvent.model.userChoice) {
      return { to: 'processWinner' };
    }
  });

  skill.onState('processWinner', (alexaEvent) => {
    const alexaChoice = CHOICES[alexaEvent.model.alexaChoice];
    const { userChoice } = alexaEvent.model;
    let reply = 'TiedResult';

    if (alexaChoice === userChoice) {
      return { reply, to: 'askUserChoice' };
    }

    if (alexaChoice === 'rock') {
      if (userChoice === 'paper') {
        alexaEvent.model.userWins += 1;
        reply = 'UserWins';
      }

      if (userChoice === 'scissors') {
        alexaEvent.model.alexaWins += 1;
        reply = 'AlexaWins';
      }
    }

    if (alexaChoice === 'paper') {
      if (userChoice === 'scissors') {
        alexaEvent.model.userWins += 1;
        reply = 'UserWins';
      }

      if (userChoice === 'rock') {
        alexaEvent.model.alexaWins += 1;
        reply = 'AlexaWins';
      }
    }

    if (alexaChoice === 'scissors') {
      if (userChoice === 'rock') {
        alexaEvent.model.userWins += 1;
        reply = 'UserWins';
      }

      if (userChoice === 'paper') {
        alexaEvent.model.alexaWins += 1;
        reply = 'AlexaWins';
      }
    }

    return { reply, to: 'askUserChoice' };
  });

  skill.onState('askIfStartANewGame', () => {
    return { reply: 'AskIfStartANewGame', to: 'shouldStartANewGame' };
  });

  skill.onState('shouldStartANewGame', (alexaEvent) => {
    if (alexaEvent.intent.name === 'AMAZON.YesIntent') {
      return { reply: 'RestartGame', to: 'askHowManyWins' };
    }

    if (alexaEvent.intent.name === 'AMAZON.NoIntent') {
      return { reply: 'Bye' };
    }
  });

  skill.onIntent('AMAZON.CancelIntent', () => {
    return { reply: 'Bye' };
  });

  skill.onIntent('AMAZON.StopIntent', () => {
    return { reply: 'Bye' };
  });
};
