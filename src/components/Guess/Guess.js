import React from "react";

function Guess({ guess }) {
  return (
    <p className="guess">
      {guess.cells.map((cell, index) => (
        <span className={`cell ${cell.status}`} key={index}>
          {cell.letter}
        </span>
      ))}
    </p>
  );
}

export default Guess;
