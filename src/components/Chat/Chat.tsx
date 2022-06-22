import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import TopBar from '../TopBar/TopBar';
import Input from '../Input/Input';
import './Chat.scss';
import Messages from '../Messages/Messages';
import SideMenu from '../SideMenu/SideMenu';

export interface User {
  id: string;
  name: string;
  room: string;
}

export interface Message {
  user: string;
  text: string;
}

const ENDPOINT = 'localhost:8080';

let socket: Socket;

const Chat = () => {
  const [userName, setUserName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const { name, room } = Object.fromEntries(params);

    socket = io(ENDPOINT);

    setUserName(name);
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

  const sendMessage = (event?: React.KeyboardEvent | React.MouseEvent) => {
    event?.preventDefault();

    if (inputRef.current?.value.length !== 0) {
      socket.emit(
        'sendMessage',
        inputRef.current?.value,
        () => (inputRef.current!.value = '')
      );
    }
  };

  return (
    <div className='chat'>
      <div className='chat__outer-container'>
        <div className='chat__inner-container'>
          {error && <p>{error}</p>}
          <TopBar room={room} />
          <Messages messages={messages} userName={userName} />
          <Input inputRef={inputRef} sendMessage={sendMessage} />
        </div>
        <div className='side-menu'>
          <SideMenu users={users} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
