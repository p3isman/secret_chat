import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import './Chat.scss';

interface User {
  id: string;
  name: string;
  room: string;
}

const ENDPOINT = 'localhost:8080';

let socket: Socket;

const Chat = () => {
  const [name, setName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const { name, room } = Object.fromEntries(params);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error: string) => {
      if (error) {
        setError(error);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on('message', message => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = (event: React.KeyboardEvent) => {
    event.preventDefault();

    if (inputRef.current?.value.length !== 0) {
      socket.emit(
        'sendMessage',
        inputRef.current?.value,
        () => (inputRef.current!.value = '')
      );
    }
  };

  return (
    <div className='chat__outer-container'>
      <div className='chat__inner-container'>
        {error && <p>{error}</p>}
        <input
          autoFocus
          ref={inputRef}
          onChange={e => (inputRef.current!.value = e.target.value)}
          onKeyDown={e => (e.key === 'Enter' ? sendMessage(e) : null)}
        />
      </div>
    </div>
  );
};

export default Chat;
