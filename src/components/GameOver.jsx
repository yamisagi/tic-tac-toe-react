import React from 'react';
import { usePlayerContext } from '../context/PlayerContext';

const GameOver = () => {
  const { checkWinner, resetGame } = usePlayerContext();
  const { draw, winner } = checkWinner();
  return (
    (winner || draw) && (
      <div id='game-over'>
        <h2>Game Over!</h2>
        {winner && <p>{winner.name} won the game!</p>}
        {!winner && <p>It&apos;s a draw!</p>}
        <p>Play again?</p>
        <button
          onClick={() => {
            resetGame();
          }}
        >
          {
            /* <a href='/'>Yes</a> */
            // This is not the best way to do it
          }
          Yes
        </button>
      </div>
    )
  );
};

export default GameOver;
