import React from "react";

import "./Banner.css";

function Banner({ won, answer, numGuesses, handlePlayAgain }) {
  let winClass = "sad";

  if (won) {
    winClass = "happy";
  }

  return (
    <div className={`banner ${winClass}`}>
      {won ? (
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>{numGuesses} guesses</strong>.
        </p>
      ) : (
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      )}

      <p>
        <button
          onClick={() => {
            handlePlayAgain();
          }}
        >
          Play Again?
        </button>
      </p>
    </div>
  );
}

export default Banner;
