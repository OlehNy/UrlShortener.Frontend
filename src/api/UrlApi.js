const apiUrl = 'https://localhost:7168/api/url';

export const getUrls = async () => {
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Error fetching URLs');
        }

        const data = await response.json();

        if (data === null || data === undefined) {
            throw new Error('Empty or invalid JSON response');
        }

        return data;
    } catch (error) {
        console.error('Error in getUrls:', error);
        throw error;
    }
};


export const createUrl = async (originalUrl) => {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ originalUrl }),
        });

        if (!response.ok) {
            throw new Error('Error creating URL');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw error;
    }
};

export const deleteUrl = async (id) => {
    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error deleting URL');
        }
    } catch (error) {
        throw error;
    }
};

export const redirectToOriginalUrl = async (shortUrl) => {
    try {
        const response = await fetch(`${apiUrl}/${shortUrl}`);
        if (!response.ok) {
            throw new Error('Error fetching original URL');
        }
        const originalURL = await response.text();
        return originalURL;
    } catch (error) {
        throw error;
    }
};


