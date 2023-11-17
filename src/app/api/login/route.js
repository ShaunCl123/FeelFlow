export async function GET(req, res) {
  // Make a note we are on the API. This goes to the console.
  console.log("in the login API page");

  // Get the values that were sent across to us.
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const pass = searchParams.get('pass');

  console.log(email);
  console.log(pass);

  const { MongoClient } = require('mongodb');
  const url = 'mongodb://your-username:your-password@localhost:27017/'; // Replace with your MongoDB connection string
  const client = new MongoClient(url);
  const dbName = 'user-registration'; // Use the same database name as in your registration code
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('users'); // Use the same collection name as in your registration code

  try {
    const findResult = await collection.find({ "email": email, "pass": pass }).toArray();
    console.log('Found documents =>', findResult);

    if (findResult.length > 0) {
      console.log("Login valid");
      // Redirect to the home page after a successful login
      res.writeHead(302, {
        'Location': '/home' // Change '/home' to the actual URL of your home page
      });
      res.end();
    } else {
      console.log("Login invalid");
    }

    // Return a response indicating the login status
    return Response.json({ "data": findResult.length > 0 });
  } catch (error) {
    console.error('Error occurred:', error);
    return Response.json({ "error": "An error occurred while processing your request." });
  }
}