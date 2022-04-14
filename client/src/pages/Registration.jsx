import React, { useContext, useState } from 'react';
import MyInput from '../component/UI/input/MyInput';
import MyButton from '../component/UI/button/MyButton';
import { Context } from '../App';

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store } = useContext(Context);

    const submit = e => {
        e.preventDefault();
        store.registration(email, password);
    }

    return (
        <div>
            <h1>Регистрация</h1>
            <form onChange={submit}>
                <MyInput type="text" placeholder="Введите логин" value={email} onChange={event => setEmail(event.target.value)} />
                <MyInput type="password" placeholder="Введите пароль" value={password} onChange={event => setPassword(event.target.value)} />
                <MyButton>Войти</MyButton>
            </form>

        </div>
    );
}

export default Registration;