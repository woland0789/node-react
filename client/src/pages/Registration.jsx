import React, { useState } from 'react';
import MyInput from '../component/UI/input/MyInput';
import MyButton from '../component/UI/button/MyButton';
import { registration } from '../action/user';

function Registration() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    return (
        <div>
            <h1>Регистрация</h1>
            <form>
                <MyInput type="text" placeholder="Введите логин" value={email} onChange={event => setEmail(event.target.value)} />
                <MyInput type="password" placeholder="Введите пароль" value={password} onChange={event => setPassword(event.target.value)} />
                <MyButton onClick={(e) => { e.preventDefault(); registration(email, password, setMessage) }}>Войти</MyButton>
            </form>
            {message != '' && <h5 style={{ color: 'tomato' }}>{message}</h5>}


        </div>
    );
}

export default Registration;