import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Access.css';

const Access = ({ setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isLogin ? 'http://localhost:3000/api/auth/login' : 'http://localhost:3000/api/auth/signup';

        try {
            const response = await axios.post(endpoint, { email, password });
            if (isLogin) {
                // On successful login, set authentication and navigate to dashboard
                setIsAuthenticated(true);
                navigate('/dashboard');
            } else {
                alert(response.data.message);
                setIsLogin(true); // Switch to login after successful signup
            }
        } catch (error) {
            alert(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="access-container">
            <div className="card">
                <h1>{isLogin ? 'Login' : 'Signup'}</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
                </form>
                <button className="switch-btn" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Switch to Signup' : 'Switch to Login'}
                </button>
            </div>
        </div>
    );
};

export default Access;
