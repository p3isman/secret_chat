import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import './Lobby.scss';

const Lobby = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if ((state as any)?.error) {
      setError(true);
    }
  }, [state]);

  const isFormValid = name.trim().length !== 0 && room.trim().length !== 0;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setError(false);
    navigate(`/chat?name=${name.trim()}&room=${room}`);
  };

  return (
    <div className='lobby__container'>
      <h1 className='heading'>Secret Chat</h1>
      {error && <div className='error'>Username is already taken.</div>}
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
