import React from 'react';
import Player from '../components/Player';
import { usePlayerContext } from '../context/PlayerContext';
import GameBoard from '../components/GameBoard';
import GameLog from '../components/GameLog';
import GameOver from '../components/GameOver';

const Home = () => {
  const { players, activePlayer } = usePlayerContext();
  return (
    <main>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            playerName={players[0].name}
            score={players[0].score}
            isActive={activePlayer() === 'X'}
          />
          <Player
            playerName={players[1].name}
            score={players[1].score}
            isActive={activePlayer() === 'O'}
          />
        </ol>
        <GameOver />
        <GameBoard />
      </div>
      <GameLog />
    </main>
  );
};

export default Home;
