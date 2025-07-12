import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/v1';

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        }
    }, [token]);

    const fetchUser = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/users/me`);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (err) {
            console.error(err);
            logout();
        }
    };

    const login = async (username, password) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
            const newToken = res.data.token;
            localStorage.setItem('token', newToken);
            setToken(newToken);
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            await fetchUser();
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const register = async (username, password, email) => {
        try {
            const res = await axios.post(`${API_BASE_URL}/auth/register`, { username, password, email });
            setUser(res.data);
            // Assuming register also logs in, or handle separately
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);