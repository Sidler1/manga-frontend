import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';
import MangaList from './pages/MangaList';
import MangaDetails from './pages/MangaDetails';
import Favorites from './pages/Favorites';
import Notifications from './pages/Notifications';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200 flex flex-col">
                    <Header />
                    <main className="container mx-auto p-4 flex-grow">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/" element={<ProtectedRoute><MangaList /></ProtectedRoute>} />
                            <Route path="/manga/:id" element={<ProtectedRoute><MangaDetails /></ProtectedRoute>} />
                            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
                            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;