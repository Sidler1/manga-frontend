import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/v1';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        fetchFavorites();
        fetchUpdates();
    }, []);

    const fetchFavorites = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/favorites/`);
            setFavorites(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchUpdates = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/favorites/updates`);
            setUpdates(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Favorites</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {favorites.map(manga => (
                    <div key={manga.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <img src={manga.coverImage} alt={manga.title} className="w-full h-48 object-cover mb-2 rounded" />
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{manga.title}</h3>
                        <a href={`/manga/${manga.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">Details</a>
                    </div>
                ))}
            </div>
            <h3 className="text-xl font-medium mt-6 mb-2">Updates</h3>
            <ul className="list-disc pl-5 space-y-2">
                {updates.map(update => (
                    <li key={update.id} className="text-gray-700 dark:text-gray-300">
                        {update.title} has new chapters!
                        <a href={`/manga/${update.id}`} className="text-blue-600 dark:text-blue-400 hover:underline ml-2">View</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Favorites;