import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import { privateRoutes, publicRoutes } from '../router';

function AppRouter() {
    const { isAuth } = useContext(AuthContext);

    return (
        isAuth
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

export default AppRouter;