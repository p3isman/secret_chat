import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Lobby.scss';

const Lobby = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  let navigate = useNavigate();

  const isFormValid = name.trim().length !== 0 && room.trim().length !== 0;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    navigate(`/chat?name=${name.trim()}&room=${room}`);
  };

  return (
    <div className='lobby__container'>
      <h1 className='heading'>Secret Chat</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='lobby__input'
          type='text'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className='lobby__input'
          type='text'
          placeholder='Room'
          onChange={(e) => setRoom(e.target.value)}
        />
        <button className='btn' type='submit' disabled={!isFormValid}>
          Join Chat
        </button>
      </form>
    </div>
  );
};

export default Lobby;
