import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Header() {
    const { isAuthenticated, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-blue-700 dark:bg-blue-950 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">Manga Hub</Link>
                <ul className="flex space-x-4">
                    {isAuthenticated ? (
                        <>
                            <li><Link to="/">Mangas</Link></li>
                            <li><Link to="/favorites">Favorites</Link></li>
                            <li><Link to="/notifications">Notifications</Link></li>
                            <li className="text-gray-200">Welcome, {user?.username}</li>
                            <li><button onClick={handleLogout} className="text-white">Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;