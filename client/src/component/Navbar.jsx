import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context';

function Navbar() {
    const { isAuth } = useContext(AuthContext);

    return ( 
        <div className='navbar'>
            {isAuth
                ?
                <div className="navbar__links">
                    <Link to="/users">Пользователи</Link>
                    <Link to="/posts">Посты</Link>
                </div>
                :
                <div className="navbar__links">
                    <Link to="/login">Вход</Link>
                    <Link to="/registration">Регистрация</Link>
                </div>
        }
            
        </div>
     );
}

export default Navbar;