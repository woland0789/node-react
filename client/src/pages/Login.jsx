import React, { useContext, useState } from 'react';
import MyInput from '../component/UI/input/MyInput';
import MyButton from '../component/UI/button/MyButton';
import { login } from '../action/user';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = e => {
        e.preventDefault();
        login(login, password);
    }
    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={submit}>
                <MyInput type="text" placeholder="Введите логин" value={email} onChange={e => setEmail(e.targe.value)}/>
                <MyInput type="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.targe.value)}/>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
}

export default Login;