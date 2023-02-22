import React from "react";

function GuessInput({ handleGuessSubmission }) {
  const [guess, setGuess] = React.useState("");

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(event) => {
        event.preventDefault();
        handleGuessSubmission(guess);
        setGuess("");
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        id="guess-input"
        type="text"
        value={guess}
        onChange={(evt) => {
          setGuess(evt.target.value);
        }}
        minLength="5"
        maxLength="5"
        pattern="[A-Za-z]{5}"
        title="Please enter a 5-letter word."
        autoComplete="off"
      />
    </form>
  );
}

export default GuessInput;
