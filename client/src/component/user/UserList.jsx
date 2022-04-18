import React from 'react';
import classes from "./User.module.css";
import { Table } from 'antd';

function UserList({ users, title, ...props }) {
    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ]
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            <Table columns={columns} dataSource={users} />
        </div>
    );
}

export default UserList;