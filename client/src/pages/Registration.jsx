import React, { useContext, useState } from 'react';
import { Context } from '../App';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Input, Space, Button } from 'antd';

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);
    const navigate = useNavigate();

    const submit = e => {
        e.preventDefault();
        store.registration(email, password, () => navigate('/'));
    }

    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col span="6">
                <h1>Enter your email and password to registration</h1>
                <form onSubmit={submit}>
                    <Space direction="vertical" style={{ display: 'flex' }}>
                        <Input placeholder="email" value={email} onChange={event => setEmail(event.target.value)} />
                        <Input.Password placeholder="password" value={password} onChange={event => setPassword(event.target.value)} />
                        <Space >
                            <Button onClick={submit} type="primary" >Login</Button>
                        </Space>
                    </Space>
                </form>
            </Col>
        </Row>
    );
}

export default Registration;