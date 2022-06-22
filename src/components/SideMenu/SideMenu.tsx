import { User } from '../Chat/Chat';
import './SideMenu.scss';
import onlineIcon from '../../res/online_icon.png';

interface Props {
  users: User[];
}

const SideMenu = ({ users }: Props) => {
  return (
    <div>
      <h3>Users</h3>
      {users.length !== 0 ? (
        users.map(user => (
          <div key={user.name} className='user'>
            <img src={onlineIcon} alt='Online icon' />
            <p>{user.name}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default SideMenu;
