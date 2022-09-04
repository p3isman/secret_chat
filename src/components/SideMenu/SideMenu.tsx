import { Dispatch, SetStateAction, useEffect } from 'react';
import { User } from '../Chat/Chat';
import { GrStatusGoodSmall } from 'react-icons/gr';
import ClipLoader from 'react-spinners/ClipLoader';
import './SideMenu.scss';

interface Props {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  userName: string;
  loading: boolean;
}

const SideMenu = ({ users, setUsers, userName, loading }: Props) => {
  useEffect(() => {
    const myUser = users.find((user) => user.name === userName);
    if (myUser) {
      const newUsers = users.filter((user) => user.name !== userName);
      newUsers.unshift(myUser);
      setUsers(newUsers);
    }
  }, [loading]);

  return (
    <div className='side-menu'>
      <h3>Users</h3>
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

      {users.map((user) => (
        <div key={user.name} className='user'>
          <GrStatusGoodSmall
            color='lightgreen'
            size={10}
            style={{ marginRight: '0.5rem' }}
          />
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};
export default SideMenu;
