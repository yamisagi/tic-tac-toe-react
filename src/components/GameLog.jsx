import React from 'react';
import { usePlayerContext } from '../context/PlayerContext';

const GameLog = () => {
  const { gameBoard, players } = usePlayerContext();

  return (
    <ol id='log'>
      {gameBoard.map((board, index) => {
        const { square } = board;
        const { row, column } = square;
        const currentPlayer = players.find(
          (player) => player.score === board.player
        ).name;
        return (
          <li key={index}>
            <p>
              {currentPlayer} played at row {row + 1}, col {column + 1}
            </p>
          </li>
        );
      })}
    </ol>
  );
};

export default GameLog;
