import { Message as MessageType } from '../../Chat/Chat';
import './Message.scss';

interface Props {
  message: MessageType;
  userName: string;
}

const Message = ({ message, userName }: Props) => {
  const { user, text } = message;

  let isSentByCurrentUser = false;

  if (user === userName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className='message message--sent'>
      <p className='message__text'>{text}</p>
    </div>
  ) : (
    <div className='message message--received'>
      <p className='message__user'>{user}</p>
      <p className='message__text'>{text}</p>
    </div>
  );
};
export default Message;
