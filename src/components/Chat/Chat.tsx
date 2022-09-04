import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import TopBar from '../TopBar/TopBar';
import MessageForm from '../MessageForm/MessageForm';
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

const ENDPOINT = 'https://live-chat-server-nodejs.herokuapp.com/';

let socket: Socket;

const Chat = () => {
  const [userName, setUserName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [loading, setLoading] = useState(true);
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
  }, [location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
      setLoading(false);
    });

    return () => {
      socket.off('message');
      socket.off('roomData');
      socket.disconnect();
    };
  }, []);

  const sendMessage: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (inputRef.current!.value.trim().length !== 0) {
      socket.emit(
        'sendMessage',
        inputRef.current!.value,
        () => (inputRef.current!.value = '')
      );
    } else {
      inputRef.current!.value = '';
    }
  };

  return (
    <div className='chat__outer-container'>
      <div className='chat__inner-container'>
        {error && <p>{error}</p>}
        <TopBar room={room} />
        <Messages messages={messages} userName={userName} loading={loading} />
        <MessageForm inputRef={inputRef} sendMessage={sendMessage} />
      </div>
      <SideMenu
        users={users}
        setUsers={setUsers}
        userName={userName}
        loading={loading}
      />
    </div>
  );
};

export default Chat;
