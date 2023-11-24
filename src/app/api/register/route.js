import { MongoClient } from 'mongodb';

// MongoDB Atlas connection URI
const uri = 'mongodb+srv://shaun:<password>@cluster0.hgdl308.mongodb.net/?retryWrites=true&w=majority';

// Database name
const dbName = 'app';

export async function post(request) {
  try {
    const { email, pass } = request.body;

    // Validate input data
    if (!email || !pass) {
      return {
        status: 400,
        body: { error: 'Invalid data. Both email and password are required.' },
      };
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
      return {
        status: 400,
        body: { error: 'User with this email already exists.' },
      };
    }

    // Create a new user document
    const newUser = {
      email,
      pass, // Note: You should hash the password before storing it in the database
    };

    // Insert the new user into the 'login' collection
    await collection.insertOne(newUser);

    // Close the MongoDB connection
    await client.close();

    // Redirect to the login page upon successful registration
    return {
      status: 302,
      headers: {
        location: '/login', // Adjust the path as needed
      },
      body: {},
    };
  } catch (error) {
    console.error('Error in API endpoint:', error);
    return {
      status: 500,
      body: { error: 'Internal Server Error' },
    };
  }
}