// /api/route/route.js
import { MongoClient } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://shaun:shaun123@cluster0.hgdl308.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const dbName = 'FeelFlowDB';
const collectionName = 'users';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, isRegistering } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
      await client.connect();
      const db = client.db(dbName);
      const usersCollection = db.collection(collectionName);

      if (isRegistering) {
        // Register new user
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'Email already exists' });
        }

        // Create a new user
        const newUser = { email, password }; // Hash password before saving in production
        await usersCollection.insertOne(newUser);

        return res.status(200).json({ message: 'User registered successfully' });
      } else {
        // Login user
        const user = await usersCollection.findOne({ email });
        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }

        if (user.password !== password) {
          return res.status(400).json({ error: 'Incorrect password' });
        }

        return res.status(200).json({ message: 'User logged in successfully' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
