import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../router';
import { observer } from 'mobx-react-lite';
import { Context } from '../App';

function AppRouter() {
    const { store } = useContext(Context);
    
    return (
        store.isAuth
            ?
            <Routes>
                {privateRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={route.element} exact={route.exact} />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map(route =>
                    <Route key={route.path} path={route.path} element={route.element} exact={route.exact} />
                )}
            </Routes>
    );
}

export default observer(AppRouter);