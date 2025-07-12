import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/v1';

function MangaDetails() {
    const { id } = useParams();
    const [manga, setManga] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [bookmark, setBookmark] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        fetchManga();
        fetchChapters();
        fetchBookmark();
        checkFavorite();
    }, [id]);

    const fetchManga = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/mangas/${id}`);
            setManga(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchChapters = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/mangas/${id}/chapters`); // Assuming this endpoint exists as per notes
            setChapters(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchBookmark = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/bookmarks/${id}`);
            setBookmark(res.data.chapter);
        } catch (err) {
            console.error(err);
        }
    };

    const checkFavorite = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/favorites`);
            setIsFavorite(res.data.some(fav => fav.id === parseInt(id)));
        } catch (err) {
            console.error(err);
        }
    };

    const toggleFavorite = async () => {
        try {
            if (isFavorite) {
                await axios.delete(`${API_BASE_URL}/favorites/${id}`);
            } else {
                await axios.post(`${API_BASE_URL}/favorites/${id}`);
            }
            setIsFavorite(!isFavorite);
        } catch (err) {
            console.error(err);
        }
    };

    const setBookmarkChapter = async (chapter) => {
        try {
            await axios.post(`${API_BASE_URL}/bookmarks/${id}`, { chapter });
            setBookmark(chapter);
        } catch (err) {
            console.error(err);
        }
    };

    if (!manga) return <div className="text-center">Loading...</div>;

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">{manga.title}</h2>
            <img src={manga.coverImage} alt={manga.title} className="w-48 h-auto mb-4 rounded" />
            <p className="text-gray-700 dark:text-gray-300 mb-2">{manga.description}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Author: {manga.author}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-2">Status: {manga.status}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">Tags: {manga.tags.join(', ')}</p>
            <button onClick={toggleFavorite} className="bg-blue-600 dark:bg-blue-700 text-white p-2 rounded mb-4 hover:bg-blue-700 dark:hover:bg-blue-800 transition">
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
            <h3 className="text-xl font-medium mt-4 mb-2">Chapters</h3>
            <ul className="list-disc pl-5 space-y-2">
                {chapters.map(ch => (
                    <li key={ch.chapterNumber} className="text-gray-700 dark:text-gray-300">
                        <a href={ch.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                            {ch.title} (Read on original site)
                        </a>
                        <button onClick={() => setBookmarkChapter(ch.chapterNumber)} className="ml-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
                            Bookmark
                        </button>
                        {bookmark === ch.chapterNumber && <span className="ml-2 text-green-600 dark:text-green-400">Bookmarked</span>}
                    </li>
                ))}
            </ul>
            <p className="mt-4 text-red-600 dark:text-red-400">Please read on the original website to support the creators.</p>
            {/* Estimated next chapter: Not implemented, add if endpoint added */}
        </div>
    );
}

export default MangaDetails;