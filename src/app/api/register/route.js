import { MongoClient } from 'mongodb';
import { Response } from '@sveltejs/kit';

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://shaun:shaun123@cluster0.hgdl308.mongodb.net/?retryWrites=true&w=majority';

// Database name
const dbName = 'app';

export async function POST(req, res) {
  try {
    const { email, pass } = req.body;

    // Validate input data
    if (!email || !pass) {
      return Response.json({ error: 'Invalid data. Both email and password are required.' }, { status: 400 });
    }

    // Connect to MongoDB Atlas
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Access the database
    const database = client.db(dbName);

    // Access the 'login' collection
    const collection = database.collection('login');

    // Check if the user already exists
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
      return Response.json({ error: 'User with this email already exists.' }, { status: 400 });
    }

    // Create a new user document
    const newUser = {
      email,
      pass, // Note: You should hash the password before storing it in the database
    };

    // Insert the new user into the 'login' collection
    const result = await collection.insertOne(newUser);

    // Close the MongoDB connection
    await client.close();

    // Redirect to the login page upon successful registration
    return Response.redirect(302, '/login'); // Adjust the path as needed
  } catch (error) {
    console.error('Error in API endpoint:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}