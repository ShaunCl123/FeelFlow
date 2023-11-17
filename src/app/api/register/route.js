import { MongoClient } from 'mongodb';

export async function GET(req, res) {
  console.log("in the api page");

  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const numb = searchParams.get('numb');
  const add = searchParams.get('add');
  const pass = searchParams.get('pass');

  console.log(email);
  console.log(pass);
  console.log(numb);
  console.log(add);

  const uri = 'mongodb+srv://shaun:shaun123@cluster0.hgdl308.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const dbName = 'app';

  try {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('login');

    // Perform the database operation (insert, find, etc.)
    const result = await collection.insertOne({ "username": email, "pass": pass });
    console.log(`Inserted ${result.insertedCount} document into the collection`);

    // Send a response back
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "data": "valid" }));
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ "error": "Internal Server Error" }));
  } finally {
    // Close the connection
    await client.close();
  }
}