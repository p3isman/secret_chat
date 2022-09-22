import React, { useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import TopBar from '../TopBar/TopBar';
import MessageForm from '../MessageForm/MessageForm';
import './Chat.scss';
import Messages from '../Messages/Messages';
import SideMenu from '../SideMenu/SideMenu';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

export interface User {
  id: string;
  name: string;
  room: string;
}

export interface Message {
  user: string;
  text: string;
}

let socket: Socket;

const Chat = () => {
  const [userName, setUserName] = useState<string>('');
  const [room, setRoom] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const { name, room } = Object.fromEntries(params);

    socket = io(import.meta.env.VITE_ENDPOINT);

    setUserName(name);
    setRoom(room);

    socket.emit('join', { name, room }, (error: string) => {
      if (error) {
        navigate('/', {
          state: {
            error: 'Username is already taken.',
          },
        });
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
    <>
      {loading ? (
        <div className='chat__loading-container'>
          <ClipLoader
            color='#2979ff'
            loading={loading}
            speedMultiplier={0.75}
          />
        </div>
      ) : (
        <div className='chat__outer-container'>
          <div className='chat__inner-container'>
            <TopBar room={room} />
            <Messages messages={messages} userName={userName} />
            <MessageForm inputRef={inputRef} sendMessage={sendMessage} />
          </div>
          <SideMenu users={users} setUsers={setUsers} userName={userName} />
        </div>
      )}
    </>
  );
};

export default Chat;
