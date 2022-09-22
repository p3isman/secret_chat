import { Dispatch, SetStateAction, useEffect } from 'react';
import { User } from '../Chat/Chat';
import { GrStatusGoodSmall } from 'react-icons/gr';
import './SideMenu.scss';

interface Props {
  users: User[];
  setUsers: Dispatch<SetStateAction<User[]>>;
  userName: string;
}

const SideMenu = ({ users, setUsers, userName }: Props) => {
  useEffect(() => {
    const myUser = users.find((user) => user.name === userName);
    if (myUser) {
      const newUsers = users.filter((user) => user.name !== userName);
      newUsers.unshift(myUser);
      setUsers(newUsers);
    }
  }, []);

  return (
    <div className='side-menu'>
      <h3>Users</h3>
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
