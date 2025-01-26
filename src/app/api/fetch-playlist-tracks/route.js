import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const TOKEN_URL = "https://accounts.spotify.com/api/token";

const PLAYLISTS = {
  Happy: "6oAh8LZ42ITzHqZRO89J63",
  Sad: "3Xnxy5AXcfxRFyfe5572oA",
  Active: "1dCv7kEktSwCZUbZ9yCTrH",
};

let accessToken = '';
let tokenExpiration = 0;

const getAccessToken = async () => {
  const now = Date.now();
  if (accessToken && now < tokenExpiration) {
    return accessToken; // Return the existing access token if it hasn't expired
  }

  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    }),
  });

  if (!response.ok) {
    throw new Error(`Unable to get access token: ${response.statusText}`);
  }

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiration = Date.now() + data.expires_in * 1000; // Set the expiration time
  return accessToken;
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const emotion = searchParams.get('emotion');

  // Select the appropriate playlist ID based on the emotion
  const playlistId = PLAYLISTS[emotion];
  if (!playlistId) {
    return NextResponse.json({ error: 'Invalid emotion or playlist not found' }, { status: 400 });
  }

  try {
    const token = await getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch playlist tracks' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}