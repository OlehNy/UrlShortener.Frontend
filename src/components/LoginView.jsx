import React, { useState } from 'react';
import { loginUser } from '../api/AuthApi';

const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const loginSuccess = await loginUser(username, password);

        if (loginSuccess) {
          window.location.href = '/';
        } else {
          console.rror('Login failed. Please check your credentials.');
        }
        console.log(username + " " + password);
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginView;
