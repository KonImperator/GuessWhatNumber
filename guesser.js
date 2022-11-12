const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
// initiating readline

let numberToGuess = Math.floor(Math.random() * 100);
// this will be the random number you're supposed to guess
let guess;
let guessCounter = 0;
let rounds = 1;
// initiating used variables

let recursiveAsyncReadline = function () {
  rl.question(`Guess the number (0-${rounds * 100}): `, (number) => {
    guess = parseInt(number);
    // parsing input in order to validate
    if (guessCounter > 20) {
      console.log("Whoah there, you tried too hard and you broke the program. GAME OVER BOZO!");
      return rl.close();
    }
    // ending game if over 20 attempts have been made
    if (guess <= rounds * 100 && guess >= 0 && !isNaN(guess)) {
      if (guess === numberToGuess) {
        if (guessCounter === 1) {
          console.log("HUUUUUUUUUUUUUUUUUH? HOW DID YOU GUESS THAT?");
        }
        if (guessCounter < 10 && guessCounter > 1) {
          console.log(`You guessed it smartass! And with only ${guessCounter} attempts!`);
        }
        if (guessCounter >= 10 && guessCounter <= 20) {
          console.log(`Whoah, that sure took a while, huh? Trying ${guessCounter} times is kinda weak, no?`);
        }
        // conditions for different responses
        numberToGuess = Math.floor(Math.random() * (rounds * 100));
        rounds++;
        guessCounter = 0;
        console.log(`Time for round ${rounds}`);
        rl.question(`Guess the number (0-${rounds * 100}): `, (number) => {
          recursiveAsyncReadline();
        })
        // once guessed correctly, the guessed upper range increases, rounds increment and guess attempts are reset
        // after which the user is reprompted with a the new question with the higher range
        // recursion is used to reimplement the flow
      } else if (guess > numberToGuess) {
        console.log("You should guess LOWER :)");
        guessCounter++;
        recursiveAsyncReadline();
      }else if (guess < numberToGuess) {
        console.log("You should guess HIGHER ;)");
        guessCounter++;
        recursiveAsyncReadline();
      }
      // appropriate prompts are logged when a user guesses higher/lower they get reprompted through the recursive function
    } else {
      console.log("Invalid input! Don't be sneaky :^)");
      recursiveAsyncReadline();
    }
     // in case of invalid input, reprompt
  });
};
recursiveAsyncReadline();
