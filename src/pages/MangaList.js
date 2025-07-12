import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/v1';

function MangaList() {
    const [mangas, setMangas] = useState([]);
    const [search, setSearch] = useState({ tags: [], title: '' }); // Example search criteria
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMangas();
    }, []);

    const fetchMangas = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${API_BASE_URL}/mangas/`);
            if (!Array.isArray(res.data)) {
                throw new Error('Expected an array of mangas');
            }
            setMangas(res.data);
        } catch (err) {
            console.error(err);
            setError('Failed to load mangas. Please try again later.');
            setMangas([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.post(`${API_BASE_URL}/mangas/search`, search);
            if (!Array.isArray(res.data)) {
                throw new Error('Expected an array of mangas from search');
            }
            setMangas(res.data);
        } catch (err) {
            console.error(err);
            setError('Search failed. Please try again.');
            setMangas([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center">Loading mangas...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">All Mangas</h2>
            {/* Search form */}
            <div className="mb-4 flex">
                <input
                    type="text"
                    placeholder="Search by title"
                    value={search.title}
                    onChange={(e) => setSearch({ ...search, title: e.target.value })}
                    className="flex-grow p-2 border rounded-l border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                {/* Add tags input if needed */}
                <button onClick={handleSearch} className="bg-blue-600 dark:bg-blue-700 text-white p-2 rounded-r hover:bg-blue-700 dark:hover:bg-blue-800 transition">Search</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {mangas.map(manga => (
                    <div key={manga.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <img src={manga.coverImage} alt={manga.title} className="w-full h-48 object-cover mb-2 rounded" />
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{manga.title}</h3>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{manga.description}</p>
                        <a href={`/manga/${manga.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">Details</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MangaList;