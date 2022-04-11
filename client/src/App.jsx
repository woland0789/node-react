import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './component/Navbar';
import AppRouter from './component/AppRouter';
import { AuthContext } from './context';

function App() {
    const [isAuth, setIsAuth] = useState(false);

    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <Navbar />
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    );
}

export default App;
