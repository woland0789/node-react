import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';

export default class Store{
    user = {};
    isAuth = false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    async login(email, password) {
        try {
            const response = await AuthService.login(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async registration(email, password) {
        try {
            const response = await AuthService.registration(email, password);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');
            console.log(this);
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/refresh', { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        } finally {
            this.setLoading(false);
        }
    }
}