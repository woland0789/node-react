import React, { useContext, useState } from 'react';
import { Context } from '../App';
import { Row, Col, Input, Space, Button } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);
    const location = useLocation();
    const navigate = useNavigate();
    const fromPath = location.state?.from?.pathname || '/';

    const submit = e => {
        e.preventDefault();
        store.login(email, password, () => navigate(fromPath));
    }
    return (
        <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col span="6">
                <h1>Enter your email and password to login</h1>
                <form onSubmit={submit}>
                    <Space direction="vertical" style={{ display: 'flex' }}>
                        <Input placeholder="email" value={email} onChange={event => setEmail(event.target.value)} />
                        <Input.Password placeholder="password" value={password} onChange={event => setPassword(event.target.value)} />
                        <Space >
                            <Button onClick={submit} type="primary" >Login</Button>
                            <Button onClick={() => navigate('/registration')} >Registration</Button>
                        </Space>

                    </Space>
                </form>
            </Col>
        </Row>
    );
}

export default Login;