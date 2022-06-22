import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Lobby.scss';

const Lobby = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');

  return (
    <div className='join__outer-container'>
      <div className='join__inner-container'>
        <h1 className='heading'>Live Chat</h1>
        <div>
          <input
            className='join__input'
            type='text'
            placeholder='Name'
            onChange={e => setName(e.target.value)}
          />
          <input
            className='join__input'
            type='text'
            placeholder='Room'
            onChange={e => setRoom(e.target.value)}
          />
          <Link
            to={`/chat?name=${name}&room=${room}`}
            onClick={e => (!name || !room ? e.preventDefault() : null)}>
            <button className='btn' type='submit'>
              Join Chat
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
