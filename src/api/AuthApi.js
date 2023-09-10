const apiUrl = 'https://localhost:7168/api/auth';

export const loginUser = async (username, password) => {
    try {
        const response = await fetch(apiUrl + '/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            const token = data.token;

            localStorage.setItem('token', token);

            return true;
        } else {
            console.error('Login failed');
            return false;
        }
    } catch (error) {
        console.error('Login failed:', error);
        return false;
    }
};
