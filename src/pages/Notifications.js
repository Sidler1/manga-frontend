import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api/v1';

function Notifications() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/users/notifications`);
            setNotifications(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <ul className="list-disc pl-5 space-y-2">
                {notifications.map(notif => (
                    <li key={notif.id} className="text-gray-700 dark:text-gray-300">
                        {notif.message} - {new Date(notif.timestamp).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Notifications;