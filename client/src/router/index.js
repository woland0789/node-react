import Login from "../pages/Login";
import Posts from "../pages/Posts";
import Registration from "../pages/Registration";
import Users from "../pages/Users";

export const routes = [
    { path: '/admin/users', element: <Users /> },
    { path: '/posts', element: <Posts /> },
    { path: '/*', element: <Posts /> },
    { path: '/login', element: <Login /> },
    { path: '/registration', element: <Registration /> },
];
