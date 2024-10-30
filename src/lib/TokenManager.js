// src/lib/TokenManager.js

import { useState, useEffect } from 'react';

const TokenManager = () => {
    const [accessToken, setAccessToken] = useState(null);
    const [expiresAt, setExpiresAt] = useState(0);

    const refreshToken = async () => {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + btoa(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`),
            },
            body: new URLSearchParams({
                grant_type: 'client_credentials',
            }),
        });

        if (response.ok) {
            const data = await response.json();
            setAccessToken(data.access_token);
            setExpiresAt(Date.now() + data.expires_in * 1000);
        } else {
            console.error('Error refreshing token:', response.statusText);
        }
    };

    useEffect(() => {
        if (!accessToken || Date.now() >= expiresAt) {
            refreshToken();
        }
    }, [accessToken, expiresAt]);

    return accessToken;
};

export default TokenManager;