import { observer } from 'mobx-react-lite';
import { useContext, useEffect } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Context } from '../App';

function ProtectedRoutes() {
    const { store } = useContext(Context);


    const location = useLocation();
    console.log('protected routes', store.isAuth);
    return store.isAuth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
}

export default observer(ProtectedRoutes);