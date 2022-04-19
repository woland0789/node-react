import React, { useEffect, useState } from 'react';
import UserList from '../component/user/UserList';
import UserService from '../services/UserService';

function Users() {
    useEffect(() => {
        UserService.fetchUsers().then(response => setUsers(response.data));
    }, []);

    const [users, setUsers] = useState();

    return (
        <div >
            <h1 style={{ textAlign: 'center' }}>Пользователи</h1>
            <UserList users={users} />
        </div>
    );
}

export default Users;