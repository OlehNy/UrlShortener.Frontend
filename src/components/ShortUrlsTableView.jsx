import React, { useEffect, useState } from 'react';
import { getUrls, deleteUrl, createUrl, redirectToOriginalUrl } from '../api/UrlApi';

const UrlsTableView = () => {
    const [urls, setUrls] = useState([]);
    const [newUrl, setNewUrl] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUrls = async () => {
            try {
                const data = await getUrls();
                setUrls(data);
            } catch (error) {
                console.error('Error fetching URLs:', error);
            }
        };

        fetchUrls();
    }, []);

    const handleAddUrl = async () => {
        try {
            await createUrl(newUrl);

        } catch (error) {
            console.log(error);
            setError('Error adding URL. Please check if it already exists.');
        }
    };

    const handleDeleteUrl = async (id) => {
        try {
            await deleteUrl(id);

            setUrls(urls.filter((url) => url.id !== id));
        } catch (error) {
            console.error('Error deleting URL:', error);
        }
    };

    const redirect = async (shortenedURL) => {
        const originalURL = await redirectToOriginalUrl(shortenedURL)
        window.location.href = "https://" + originalURL;
    };

    return (
        <div>
            <h1>URLs Table</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User ID</th>
                        <th>Original URL</th>
                        <th>Shortened URL</th>
                        <th>Created Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {urls.map((url) => (
                        <tr key={url.id}>
                            <td>{url.id}</td>
                            <td>{url.userId}</td>
                            <td>{url.originalURL}</td>
                            <td>
                                <a href="#" onClick={() => redirect(url.shortenedURL)}>
                                    {url.shortenedURL}
                                </a>
                            </td>
                            <td>{url.createdDate}</td>
                            <td>
                                <button onClick={() => handleDeleteUrl(url.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Add New URL</h2>
            <input
                type="text"
                placeholder="Enter URL"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
            />
            <button onClick={handleAddUrl}>Add URL</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
};

export default UrlsTableView;
