import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from '../../App';
import classes from './Navbar.module.css';
import { Menu, Layout} from 'antd';
import { UserOutlined } from '@ant-design/icons';

function MainNavbar() {
    const location = useLocation();
    const { store } = useContext(Context);
    const navigate = useNavigate();

    return (
        <Layout.Header>
            <div className={classes.logo}>
                <h1>Budget</h1>
            </div>
            {store.isAuth &&
                <div className={classes.menu}>
                    <Menu mode="horizontal" theme="dark" defaultSelectedKeys={[location.pathname]}>
                        <Menu.Item key="/admin/users">
                            <Link to="/admin/users">Users</Link>
                        </Menu.Item>
                        <Menu.Item key="/expenses">
                            <Link to="/expenses">Расходы</Link>
                        </Menu.Item>
                        
                    </Menu>
                    <Menu mode="horizontal" theme="dark" >
                        <Menu.SubMenu key="profile" icon={<UserOutlined />} title="User Name">
                            <Menu.Item key="logout" onClick={() => store.logout(() => navigate('/login'))}>Logout</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </div>
            }


        </Layout.Header>

    );
}

export default observer(MainNavbar);