const CHOICES = ["rock", "paper", "scissors"];

function register(voxaApp) {
  voxaApp.onIntent("LaunchIntent", () => {
    return { reply: "Welcome", to: "askHowManyWins" };
  });

  voxaApp.onState("askHowManyWins", () => {
    return { flow: "yield", reply: "AskHowManyWins", to: "getHowManyWins" };
  });

  voxaApp.onState("getHowManyWins", voxaEvent => {
    if (voxaEvent.intent.name === "MaxWinsIntent") {
      voxaEvent.model.wins = voxaEvent.intent.params.wins;
      voxaEvent.model.userWins = 0;
      voxaEvent.model.alexaWins = 0;
      return { reply: "StartGame", to: "askUserChoice" };
    }
  });

  voxaApp.onState("askUserChoice", voxaEvent => {
    if (parseInt(voxaEvent.model.userWins) >= parseInt(voxaEvent.model.wins)) {
      return { reply: "UserWinsTheGame", to: "askIfStartANewGame" };
    }

    if (parseInt(voxaEvent.model.alexaWins) >= parseInt(voxaEvent.model.wins)) {
      return { reply: "AlexaWinsTheGame", to: "askIfStartANewGame" };
    }

    const min = 0;
    const max = CHOICES.length - 1;
    voxaEvent.model.userChoice = undefined;
    voxaEvent.model.alexaChoice =
      Math.floor(Math.random() * (max - min + 1)) + min;
    return { flow: "yield", reply: "AskUserChoice", to: "getUserChoice" };
  });

  voxaApp.onState("getUserChoice", voxaEvent => {
    if (voxaEvent.intent.name === "RockIntent") {
      voxaEvent.model.userChoice = "rock";
    } else if (voxaEvent.intent.name === "PaperIntent") {
      voxaEvent.model.userChoice = "paper";
    } else if (voxaEvent.intent.name === "ScissorsIntent") {
      voxaEvent.model.userChoice = "scissors";
    }

    if (voxaEvent.model.userChoice) {
      return { to: "processWinner" };
    }
  });

  voxaApp.onState("processWinner", voxaEvent => {
    const alexaChoice = CHOICES[voxaEvent.model.alexaChoice];
    const { userChoice } = voxaEvent.model;
    let reply = "TiedResult";

    if (alexaChoice === userChoice) {
      return { reply, to: "askUserChoice" };
    }

    if (alexaChoice === "rock") {
      if (userChoice === "paper") {
        voxaEvent.model.userWins += 1;
        reply = "UserWins";
      }

      if (userChoice === "scissors") {
        voxaEvent.model.alexaWins += 1;
        reply = "AlexaWins";
      }
    }

    if (alexaChoice === "paper") {
      if (userChoice === "scissors") {
        voxaEvent.model.userWins += 1;
        reply = "UserWins";
      }

      if (userChoice === "rock") {
        voxaEvent.model.alexaWins += 1;
        reply = "AlexaWins";
      }
    }

    if (alexaChoice === "scissors") {
      if (userChoice === "rock") {
        voxaEvent.model.userWins += 1;
        reply = "UserWins";
      }

      if (userChoice === "paper") {
        voxaEvent.model.alexaWins += 1;
        reply = "AlexaWins";
      }
    }

    return { reply, to: "askUserChoice" };
  });

  voxaApp.onState("askIfStartANewGame", () => {
    return {
      flow: "yield",
      reply: "AskIfStartANewGame",
      to: "shouldStartANewGame",
    };
  });

  voxaApp.onState("shouldStartANewGame", voxaEvent => {
    if (voxaEvent.intent.name === "YesIntent") {
      return { reply: "RestartGame", to: "askHowManyWins" };
    }

    if (voxaEvent.intent.name === "NoIntent") {
      return { flow: "terminate", reply: "Bye" };
    }
  });

  voxaApp.onIntent("CancelIntent", () => {
    return { flow: "terminate", reply: "Bye" };
  });

  voxaApp.onIntent("StopIntent", () => {
    return { flow: "terminate", reply: "Bye" };
  });
}

module.exports = register;
