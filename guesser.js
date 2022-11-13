const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
// initiating readline

let guess;
let guessCounter = 0;
let rounds = 1;
// initiating used variables

let numberToGuess = Math.floor(Math.random() * (rounds * 100));
// this will be the random number you're supposed to guess

const levelUp = function () {
  numberToGuess = Math.floor(Math.random() * (rounds * 100));
  rounds++;
  guessCounter = 0;
  console.log(`Time for round ${rounds}`);
  rl.question(`Guess the number (0-${rounds * 100}): `, (number) => {
    recursiveValidatePrompt();
  });
};
// called each time the user guesses the random number correctly - adjusts new variables and reprompts user with the recursive function
// once guessed correctly, the guessed upper range increases by 100, rounds increment and guess attempts are reset
// after which the user is reprompted with a the new question with the higher range
// recursion is then used to reimplement the flow

const guessedCorrectly = function (attempts) {
  if (attempts === 1) {
    console.log("HUUUUUUUUUUUUUUUUUH? HOW DID YOU GUESS THAT?");
  }
  if (attempts > 1 && attempts < 10) {
    console.log(`You guessed it smartass! And with only ${attempts} attempts!`);
  }
  if (attempts >= 10 && attempts <= 20) {
    console.log(
      `Whoah, that sure took a while, huh? Trying ${attempts} times is kinda weak, no?`
    );
  }
  levelUp();
};
// function to log different responses with the end result dictated by the number of attempts

const gameOver = function (attempts) {
  if (attempts > 20) {
    console.log(
      "Whoah there, you tried too hard and you broke the program. GAME OVER BOZO!"
    );
    return true;
  }
  return false;
};
// checks if over 20 attempts to guess have been made and returns true if yes, and false if not

const attemptedGuess = function () {
  if (guess === numberToGuess) {
    guessCounter++
    guessedCorrectly(guessCounter);
  } else if (guess > numberToGuess) {
    console.log("You should guess LOWER :)");
    guessCounter++;
    recursiveValidatePrompt();
  } else if (guess < numberToGuess) {
    console.log("You should guess HIGHER ;)");
    guessCounter++;
    recursiveValidatePrompt();
  }
};
// respective prompts are logged when a user guesses higher/lower they get reprompted through the recursive function

const recursiveValidatePrompt = function () {
  rl.question(`Guess the number (0-${rounds * 100}): `, (number) => {
    guess = parseInt(number);
    // parsing input in order to validate as number or not
    if (gameOver(guessCounter)) {
      return rl.close();
    }
    // ends the program if gameOver returns true

    if (guess <= rounds * 100 && guess >= 0 && !isNaN(guess)) {
      attemptedGuess();
      // check if higher/lower/equal and log response then reprompt if guess is incorrect
    } else {
      guessCounter++;
      console.log("Invalid input! Don't be sneaky :^)");
      recursiveValidatePrompt();
    }
    // in case of invalid input, reprompt (attempts still increment)
  });
};
recursiveValidatePrompt();
console.log(numberToGuess)