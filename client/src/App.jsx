import React, { createContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Navbar from './component/Navbar';
import AppRouter from './component/AppRouter';
import Store from './store/store.js';
import { observer } from 'mobx-react-lite';

export const store = new Store();
export const Context = createContext({ store });


function App() {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        }
    }, [])

    return (
        <Context.Provider value={{
            store
        }}>
            {store.isLoading
                ?
                <div>Загрузка...</div>
                :
                <BrowserRouter>
                    <Navbar />
                    <AppRouter />
                </BrowserRouter>
            }
        </Context.Provider>
    );
}

export default observer(App);
