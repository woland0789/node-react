import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../App';
import Posts from '../pages/Posts.jsx';
import Users from '../pages/Users.jsx';
import Login from '../pages/Login.jsx';
import Registration from '../pages/Registration.jsx';
import ProtectedRoutes from './ProtectedRoutes';
import Expenses from '../pages/Expenses';

function AppRouter() {
    const { store } = useContext(Context);

    return (
        <Routes>
            {store.isAuth
                ?
                <>
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/expenses" element={<Expenses />} />
                </>
                :
                <>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/registration" element={<Registration />} />
                </>}
            <Route path="/*" element={<h1>Page not found</h1>} />
        </Routes>
    );
}

export default observer(AppRouter);