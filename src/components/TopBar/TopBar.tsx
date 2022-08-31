import { Link } from 'react-router-dom';
import { GrStatusGoodSmall } from 'react-icons/gr';
import { IoMdClose } from 'react-icons/io';
import './TopBar.scss';

interface Props {
  room: string;
}

const TopBar = ({ room }: Props) => {
  return (
    <div className='top-bar'>
      <div className='inner-container-left'>
        <GrStatusGoodSmall
          color='lightgreen'
          size={15}
          style={{ marginRight: '0.5rem' }}
        />
        <h3>{room}</h3>
      </div>
      <div className='inner-container-right'>
        <Link to='/'>
          <div className='close-icon'>
            <IoMdClose size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
};
export default TopBar;
