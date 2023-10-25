import React from 'react';

import { usePlayerContext } from '../context/PlayerContext';
import { initialGameBoard } from '../constants/gameBoard';

const GameBoard = () => {
  const { handleMove, gameBoard } = usePlayerContext();
  let boards = [...initialGameBoard.map((row) => [...row])]; // Deep copy
  // We need to deep copy the initialGameBoard because we don't want to mutate it
  // Even if mutating another array, it will mutate the initialGameBoard

  for (const board of gameBoard) {
    const { square, player } = board;
    const { row, column } = square;
    boards[row][column] = player;
  }

  return (
    <ol id='game-board'>
      {boards.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((symbol, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      disabled={symbol !== null}
                      // If the square is not empty, disable the button
                      // It means it is already played by X or O
                      onClick={() => {
                        handleMove(rowIndex, colIndex);
                      }}
                    >
                      {symbol}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
};

export default GameBoard;
