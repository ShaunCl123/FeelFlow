import { NextResponse } from 'next/server';
import fetch from 'node-fetch';
import { MongoClient } from 'mongodb';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://shaun:shaun123@cluster0.hgdl308.mongodb.net/?retryWrites=true&w=majority"; // MongoDB URL

const PLAYLISTS = {
  Happy: "6oAh8LZ42ITzHqZRO89J63",
  Sad: "3Xnxy5AXcfxRFyfe5572oA",
  Active: "1dCv7kEktSwCZUbZ9yCTrH",
  Focused: "4Bw0zY8HzFPRypxTiKmSqn",
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

// MongoDB client
const client = new MongoClient(MONGO_URL);

async function getUser(email) {
  await client.connect();
  const db = client.db('FeelFlowDB');
  const users = db.collection('users');
  return users.findOne({ email });
}

async function createUser(email, password) {
  await client.connect();
  const db = client.db('FeelFlowDB');
  const users = db.collection('users');
  const newUser = {
    email,
    password,  // In a real app, hash passwords before storing them!
  };
  const result = await users.insertOne(newUser);
  return result;
}

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

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const existingUser = await getUser(email);
    if (existingUser) {
      // User found, log them in
      if (existingUser.password === password) {
        return NextResponse.json({ message: 'Login successful' });
      } else {
        return NextResponse.json({ error: 'Incorrect password' }, { status: 400 });
      }
    } else {
      // User doesn't exist, create a new account
      await createUser(email, password);
      return NextResponse.json({ message: 'User created successfully, please log in.' });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while processing your request.' }, { status: 500 });
  }
}
