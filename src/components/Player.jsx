import React, { useState } from 'react';
import { usePlayerContext } from '../context/PlayerContext';

const Player = ({ playerName, score, isActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { handlePlayerNameChange } = usePlayerContext();

  //! We create a local state for the player name
  //! If we don't do this, on every key stroke, the all global state will be updated
  //! And re render the whole app - which is not what we want to do :)

  const [playerNameState, setPlayerNameState] = useState(playerName);

  const handlePlayerNameState = (event) => {
    console.log(event);
    setPlayerNameState(event);
  };
  return (
    <li className={isActive ? 'active' : ''}>
      <span className='player'>
        {!isEditing && <span className='player-name'>{playerNameState}</span>}
        {isEditing && (
          <input
            type='text'
            required
            value={playerNameState}
            onBlur={() => {
              if (isEditing) {
                handlePlayerNameChange(playerNameState, score);
                setIsEditing((prev) => !prev);
              }
            }}
            onChange={(e) => {
              const newValue = e.target.value;
              if (newValue.length >= 0 && newValue.length <= 10) {
                handlePlayerNameState(newValue);
              }
            }}
          />
        )}
        <span className='player-score'>{score}</span>
      </span>
      <button
        onClick={() => {
          setIsEditing((prev) => !prev);
          if (isEditing) {
            handlePlayerNameChange(playerNameState, score);
          }
        }}
      >
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </li>
  );
};

export default Player;
