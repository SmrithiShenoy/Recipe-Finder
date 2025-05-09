import React, { useState } from 'react';
import './SignIn.css';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [message, setMessage] = useState('');

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setSearchHistory(data.searchHistory || []);
                setMessage('Successfully signed in!');
            } else {
                setMessage('Invalid credentials');
                setSearchHistory([]);
            }
        } catch (error) {
            setMessage('Error connecting to server');
            setSearchHistory([]);
        }
    };

    return (
        <div className="signin-container">
            <form onSubmit={handleSignIn} className="signin-form">
                <h2>Sign In</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Sign In</button>
                {message && <p className="message">{message}</p>}
            </form>

            <div className="search-history">
                <h3>Previous Search History</h3>
                {searchHistory.length > 0 ? (
                    <ul>
                        {searchHistory.map((item, index) => (
                            <li key={index}>
                                {typeof item === 'object' ? item.term : item}
                                {item.timestamp && (
                                    <span className="timestamp">
                                        {new Date(item.timestamp).toLocaleDateString()}
                                    </span>
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No search history available</p>
                )}
            </div>
        </div>
    );
}

export default SignIn;
