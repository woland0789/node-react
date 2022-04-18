import React, { createContext, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './component/AppRouter';
import Store from './store/store.js';
import { observer } from 'mobx-react-lite';
import MainNavbar from './component/navbar/MainNavbar.jsx';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

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
                    <Layout className='layout' >
                        <MainNavbar />
                        <Layout.Content style={{padding: '0 50px'}}>
                            <AppRouter />
                        </Layout.Content>
                        <Layout.Footer style={{ textAlign: 'center' }}>Budget application ©2022 Created by Ruslan G.</Layout.Footer>
                    </Layout>
                </BrowserRouter>
            }
        </Context.Provider>
    );
}

export default observer(App);
