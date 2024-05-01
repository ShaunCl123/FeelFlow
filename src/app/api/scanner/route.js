import { MongoClient } from 'mongodb';



  export async function GET(req, res) {

    // Make a note we are on
    // the api. This goes to the console.
    console.log("in the api page")

  
    // =================================================
    // extract the code that was passed to us, we will use this in the DB.
    const { searchParams } = new URL(req.url)
    const code = searchParams.get('code')



  
   // const url = 'mongodb://root:example@localhost:27017/';
   //
   // your query should look like this, with a username and a password at the start.
   // see where I have kyle as the username and password as the password. Use the
   // details from your cloud DB here along with your connection string that should
   // look like this.
   const url = 'mongodb+srv://shaun:shaun123@cluster0.hgdl308.mongodb.net/?retryWrites=true&w=majority';
   const client = new MongoClient(url);
    
   
    const dbName = 'caffeine'; // database name
  
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('products'); // collection name
  
                                              // where the {} is that is where our query needs to go!
                                              
    const findResult = await collection.find({"code": code}).toArray();
    //
    // This will dump any records to the db,
    //
    console.log('Found documents =>', findResult);
  
    
  
   //==========================================================
  
  
  
  
  
    // at the end of the process we need to send something back.
    return Response.json(findResult)
  }