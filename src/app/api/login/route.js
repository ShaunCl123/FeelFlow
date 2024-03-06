import { MongoClient } from 'mongodb';

export async function GET(req, res) {
  // Make a note we are on the API. This goes to the console.
  console.log("in the login API page");

  // Get the values that were sent across to us.
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');

  console.log(email);
  console.log(pass);

  // MongoDB connection URL and database name
  const url = 'mongodb+srv://shaun:shaun123@cluster0.hgdl308.mongodb.net/?retryWrites=true&w=majority';
  const dbName = 'caffeine';

  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to server');

    // Access the database and collection
    const db = client.db(dbName);
    const collection = db.collection('login');

    // Search for a document that matches the provided email and password
    const findResult = await collection.find({ "email": email, "pass": pass }).toArray();
    console.log('Found documents =>', findResult);

    if (findResult.length > 0) {
      console.log("Login valid");
      // Send a success response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } else {
      console.log("Login invalid");
      // Send a failure response
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false }));
    }
  } catch (error) {
    console.error('Error occurred:', error);
    // Send an error response
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'An error occurred while processing your request.' }));
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}