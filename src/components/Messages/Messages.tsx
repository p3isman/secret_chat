import './Messages.scss';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Message as MessageType } from '../Chat/Chat';
import Message from './Message/Message';

interface Props {
  messages: MessageType[];
  userName: string;
}

const Messages = ({ messages, userName }: Props) => {
  return (
    <ScrollToBottom className='messages'>
      {messages.map((message, i) => (
        <Message key={i} message={message} userName={userName} />
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
