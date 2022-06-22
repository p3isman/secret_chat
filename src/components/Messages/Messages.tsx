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
      <div>
        {messages.map((message, i) => (
          <div key={i}>
            <Message message={message} userName={userName} />
          </div>
        ))}
      </div>
    </ScrollToBottom>
  );
};

export default Messages;
