import { animateScroll as scroll } from 'react-scroll';
import { BsArrowDownShort } from 'react-icons/bs';
import { Message as MessageType } from '../Chat/Chat';
import Message from './Message/Message';
import './Messages.scss';
import { useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';

interface Props {
  messages: MessageType[];
  userName: string;
  loading: boolean;
}

const Messages = ({ messages, userName, loading }: Props) => {
  const [isScrollable, setIsScrollable] = useState<boolean>(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!messagesRef.current) {
      return;
    }
    const distanceToBottom =
      messagesRef.current.scrollHeight -
      (messagesRef.current.offsetHeight + messagesRef.current.scrollTop);
    if (distanceToBottom > 100) {
      setIsScrollable(true);
    } else {
      setIsScrollable(false);
    }
  };

  return (
    <>
      {loading && (
        <div className='spinner-container'>
          <ClipLoader
            color='#2979ff'
            loading={loading}
            speedMultiplier={0.75}
            cssOverride={{ color: '#2979ff' }}
          />
        </div>
      )}
      <div
        ref={messagesRef}
        id='messages'
        className='messages'
        onScroll={handleScroll}>
        {messages.map((message, i) => (
          <Message key={i} message={message} userName={userName} />
        ))}
      </div>
      {isScrollable && (
        <button
          className='messages__scroll-btn'
          onClick={() =>
            scroll.scrollToBottom({ containerId: 'messages', duration: 200 })
          }>
          <BsArrowDownShort size={25} />
        </button>
      )}
    </>
  );
};

export default Messages;
