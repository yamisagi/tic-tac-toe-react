import { createContext, useContext, useState } from 'react';
import { WINNING_COMBINATIONS } from '../constants/gameBoard';

const initialState = [
  {
    id: 1,
    name: 'Player 1',
    score: 'X',
  },
  {
    id: 2,
    name: 'Player 2',
    score: 'O',
  },
];

export const PlayerContext = createContext(initialState);

const PlayerContextProvider = ({ children }) => {
  const [players, setPlayers] = useState(initialState);
  const [gameBoard, setGameBoard] = useState([]);

  const handlePlayerNameChange = (playerName, score) => {    const capitalized =
      playerName.charAt(0).toUpperCase() + playerName.slice(1);

    setPlayers((prevPlayers) => {
      const updatedPlayers = prevPlayers.map((player) => {
        if (player.score === score) {
          return {
            ...player,
            name: capitalized,
          };
        }
        return { ...player };
      });
      return updatedPlayers;
    });
  };

  const checkWinner = () => {
    let winner = null;
    let draw = false;
    if (gameBoard.length >= 5) {
      for (const combination of WINNING_COMBINATIONS) {
        const squares = combination.map(({ row, column }) =>
          gameBoard.find(
            (square) =>
              square.square.row === row && square.square.column === column
          )
        );
        console.log(squares);
        if (
          squares.every(
            (square) => square && square.player === squares[0].player
          )
        ) {
          winner = players.find((player) => player.score === squares[0].player);
          break;
        }
      }
    }
    if (gameBoard.length === 9 && !winner) {
      draw = true;
    }
    return { winner, draw };
  };

  const activePlayer = () => {
    let currentPlayer = 'X';
    if (gameBoard.length > 0 && gameBoard[0].player === 'X') {
      currentPlayer = 'O';
    }
    return currentPlayer;
  };

  const handleMove = (rowIndex, colIndex) => {
    setGameBoard((prevGameBoard) => {
      const currentPlayer = activePlayer(prevGameBoard);
      const updatedBoard = [
        {
          square: {
            row: rowIndex,
            column: colIndex,
          },
          player: currentPlayer,
        },
        ...prevGameBoard,
      ];

      return updatedBoard;
    });
  };

  const resetGame = () => {
    setGameBoard([]);
  };
  return (
    <PlayerContext.Provider
      value={{
        players,
        gameBoard,
        activePlayer,
        handlePlayerNameChange,
        handleMove,
        checkWinner,
        resetGame,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePlayerContext = () => {
  const {
    players,
    handlePlayerNameChange,
    gameBoard,
    handleMove,
    activePlayer,
    checkWinner,
    resetGame,
  } = useContext(PlayerContext);
  return {
    players,
    handlePlayerNameChange,
    gameBoard,
    handleMove,
    activePlayer,
    checkWinner,
    resetGame,
  };
};

export default PlayerContextProvider;
