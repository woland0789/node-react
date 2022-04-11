import React from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context';

const { isAuth, setIsAuth } = useContext(AuthContext);

export const registration = async (email, password, callback) => {
    
    try {
        const response = await axios.post('http://localhost:5000/api/auth/registration', {
            email,
            password
        });
        console.log(response);
    } catch (e) {
        callback(e.message);
    }
    
}

export const login = async (email, password, callback) => {
    

    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email,
            password
        });
        console.log(response);
    } catch (e) {
        callback(e.message);
    }

}