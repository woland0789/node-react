import React, { useContext, useState } from 'react';
import MyInput from '../component/UI/input/MyInput';
import MyButton from '../component/UI/button/MyButton';
import { Context } from '../App';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    const submit = e => {
        e.preventDefault();
        store.login(email, password);
    }
    return (
        <div>
            <h1>Страница для логина</h1>
            <form onSubmit={submit}>
                <MyInput type="text" placeholder="Введите логин" value={email} onChange={event => setEmail(event.target.value)} />
                <MyInput type="password" placeholder="Введите пароль" value={password} onChange={event => setPassword(event.target.value)} />
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
}

export default Login;