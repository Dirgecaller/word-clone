import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";

import GuessInput from "../GuessInput";
import GuessResults from "../GuessResults";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";

import { checkGuess } from "../../game-helpers";
import Banner from "../Banner/Banner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

/*
  [
    { letter: 'W', status: 'incorrect' },
    { letter: 'H', status: 'incorrect' },
    { letter: 'A', status: 'correct' },
    { letter: 'L', status: 'misplaced' },
    { letter: 'E', status: 'misplaced' },
  ]

*/

function Game() {
  const [guesses, setGuesses] = React.useState([]);
  const [numGuesses, setNumGuesses] = React.useState(0);

  const [winLose, setWinLose] = React.useState(null);

  function initialize() {
    let initGuesses = [];
    for (let i = 0; i < NUM_OF_GUESSES_ALLOWED; i++) {
      initGuesses.push({
        text: "",
        id: crypto.randomUUID(),
        cells: [
          { letter: "", status: "" },
          { letter: "", status: "" },
          { letter: "", status: "" },
          { letter: "", status: "" },
          { letter: "", status: "" },
        ],
      });
    }

    setGuesses(initGuesses);
    setWinLose(null);
    setNumGuesses(0);
  }

  if (guesses.length === 0) {
    initialize();
  }

  function getNextUnUsedGuessIndex() {
    for (let i = 0; i < guesses.length; i++) {
      if (guesses[i].text === "") {
        return i;
      }
    }

    // If we get here, it means that all guesses have been used up.
    return false;
  }

  function handleGuessSubmission(guess) {
    const nextGuessIndex = getNextUnUsedGuessIndex();

    if (nextGuessIndex === false) {
      return;
    }

    setNumGuesses(numGuesses + 1);

    const nextGuesses = [...guesses];

    console.info({ guess });

    guess = guess.toUpperCase();

    const guessTest = checkGuess(guess, answer);

    nextGuesses[nextGuessIndex].text = guess;

    nextGuesses[nextGuessIndex].cells = guessTest;

    setGuesses(nextGuesses);

    if (answer === guess) {
      setWinLose(true);
    }

    if (numGuesses === NUM_OF_GUESSES_ALLOWED - 1) {
      setWinLose(false);
    }
  }

  return (
    <>
      <GuessResults guesses={guesses} />
      {winLose === null ? (
        <GuessInput handleGuessSubmission={handleGuessSubmission} />
      ) : (
        <Banner
          won={winLose}
          answer={answer}
          numGuesses={numGuesses}
          handlePlayAgain={initialize}
        />
      )}
    </>
  );
}

export default Game;
