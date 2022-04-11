import Login from "../pages/Login";
import Posts from "../pages/Posts";
import Registration from "../pages/Registration";
import Users from "../pages/Users";

export const privateRoutes = [
    { path: '/users', element: <Users />, exact: true },
    { path: '/posts', element: <Posts />, exact: true },
    { path: '/*', element: <Posts />, exact: true },
];

export const publicRoutes = [
    { path: '/login', element: <Login />, exact: true },
    { path: '/registration', element: <Registration />, exact: true },
    { path: '/*', element: <Login />, exact: true },
]