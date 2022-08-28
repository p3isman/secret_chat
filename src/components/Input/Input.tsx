import React from 'react';
import './Input.scss';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  sendMessage: (event?: React.KeyboardEvent | React.MouseEvent) => void;
}

const Input = ({ inputRef, sendMessage }: Props) => {
  return (
    <form className='form'>
      <input
        autoFocus
        ref={inputRef}
        type='text'
        placeholder='Type a message here'
        onChange={(e) => (inputRef.current!.value = e.target.value)}
        onKeyDown={(e) => (e.key === 'Enter' ? sendMessage(e) : null)}
      />
      <button className='btn-send' onClick={(e) => sendMessage(e)}>
        Send
      </button>
    </form>
  );
};
export default Input;
