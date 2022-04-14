import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../App';

function Navbar() {
    const { store } = useContext(Context);
    return (
        <div className='navbar'>
            {
                store.isAuth
                    ?
                    <div className="navbar__links">
                        <Link to="/users" className="navbar__link">Пользователи</Link>
                        <Link to="/posts" className="navbar__link">Посты</Link>
                        <div onClick={() => store.logout()} className="navbar__link">Выйти</div>
                    </div>
                    
                    :
                    <div className="navbar__links">
                        <Link to="/login">Вход</Link>
                        <Link to="/registration">Регистрация</Link>
                    </div>
            }
        </div >
    );
}

export default observer(Navbar);