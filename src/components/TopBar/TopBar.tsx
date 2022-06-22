import { Link } from 'react-router-dom';
import onlineIcon from '../../res/online_icon.png';
import closeIcon from '../../res/close_icon.png';
import './TopBar.scss';

interface Props {
  room: string;
}

const TopBar = ({ room }: Props) => {
  return (
    <div className='top-bar'>
      <div className='inner-container-left'>
        <img className='online-icon' src={onlineIcon} alt='Online icon' />
        <h3>{room}</h3>
      </div>
      <div className='inner-container-right'>
        <Link to='/'>
          <img src={closeIcon} alt='Close icon' />
        </Link>
      </div>
    </div>
  );
};
export default TopBar;
