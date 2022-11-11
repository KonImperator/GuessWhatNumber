const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let numberToGuess = Math.floor(Math.random() * 100);
let guess;
let guessCounter = 0;

let recursiveAsyncReadline = function () {
  rl.question("Guess the number (0-100): ", (number) => {
    guess = parseInt(number);
    if (guessCounter > 20) {
      console.log(
        "Whoah there, you tried too hard and you broke the program. PAY UP BOZO!"
      );
      return rl.close();
    }
    if (guess <= 100 && guess >= 0 && !isNaN(guess)) {
      if (guess === numberToGuess) {
        guessCounter++;
        if (guessCounter === 1) {
          console.log("HUUUUUUUUUUUUUUUUUH? HOW DID YOU GUESS THAT?");
          return rl.close();
        }
        if (guessCounter < 10 && guessCounter > 1) {
          console.log(
            `You guessed it smartass! And only with ${guessCounter} attempts!`
          );
        }
        if (guessCounter >= 10 && guessCounter <= 20) {
          console.log(
            `Whoah, that sure took a while, huh? Trying ${guessCounter} times is kinda pathetic lul!`
          );
        }
        return rl.close();
      }
      if (guess > numberToGuess) {
        console.log("You should guess LOWER :)");
        guessCounter++;
        recursiveAsyncReadline();
      }
      if (guess < numberToGuess) {
        console.log("You should guess HIGHER ;)");
        guessCounter++;
        recursiveAsyncReadline();
      }
    } else {
      console.log("Invalid input! Don't be sneaky :^)");
      recursiveAsyncReadline();
    }
  });
};
recursiveAsyncReadline();
