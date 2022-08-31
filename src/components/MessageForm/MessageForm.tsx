import React from 'react';
import { TbSend } from 'react-icons/tb';
import './MessageForm.scss';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  sendMessage: React.FormEventHandler<HTMLFormElement>;
}

const MessageForm = ({ inputRef, sendMessage }: Props) => {
  return (
    <form className='form' onSubmit={sendMessage}>
      <input
        autoFocus
        ref={inputRef}
        type='text'
        placeholder='Type a message here'
        onChange={(e) => (inputRef.current!.value = e.target.value)}
      />
      <button type='submit' className='btn-container'>
        <TbSend className='btn-send' size={20} />
      </button>
    </form>
  );
};
export default MessageForm;
