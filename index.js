const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5009;
const cors = require('cors');

// Use as Middleware (cors)
app.use(cors());
app.use(express.json());

// arifazizbd
// SEVPcYoYRwuuG4Xg

// From MongoDB: Start

const uri = "mongodb+srv://arifazizbd:SEVPcYoYRwuuG4Xg@cluster0.bsjngpi.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Send data to MongoDB database
    const database = client.db("usersDB");

    const userCollection = database.collection("haiku");

    // "R" from CRUD operations
    app.get('/users', async(req, res) => {
        const cursor = userCollection.find({})
        const result = await cursor.toArray();
        res.send(result);
    })
    
    // 'C' from CRUD operations
    app.post('/users', async(req, res) => {
        console.log('Post API Hitting Server');
        const user = req.body;
        console.log('New user', user);
        const result = await userCollection.insertOne(user);
        res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 4 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// MongoBD Endpoint


app.get('/', (req, res) =>{
    res.send('User Management server is running')
});

// Now we don't need these in-memory data as we successfully post/get data from MongoDB
// const users = [
//     {"id": 1, "name": "Tom", "email": "tom@mail.com"},
//     {"id": 2, "name": "Dik", "email": "dik@mail.com"},
//     {"id": 3, "name": "Harry", "email": "harry@mail.com"},
// ];

// app.get('/users', (req, res) => {
//     res.send(users);
// });

// app.post('/users', (req, res) => {
//     console.log('Post API Hitting Server');
//     console.log(req.body);
// });

app.listen(port, () => {
    console.log(`User Management server listening on ${port}`)
});



/** Explanation of the upper
 * The upper code is a Node.js server application that uses the Express framework to implement a REST API for user management. Here is a brief overview of what is happening in the code:

First, the required Node.js packages and libraries are imported, including the Express framework, the MongoDB client, and the cors middleware. The server is then set up by creating an instance of the Express app and defining a few middleware functions using the use method. Specifically, the cors and express.json() middleware are used.

Next, a MongoDB connection is established using the MongoClient library. The MongoDB URI string is stored in the uri variable, and the client is created with an options object that sets the API version to v1.0, among other options. A function called run is defined as an asynchronous function that attempts to connect to the MongoDB server, logs a success message, and defines a POST endpoint /users that logs the new user data sent to the server in the console.

The main app function defines two routes: the default route /, which returns a message indicating that the server is running, and a GET endpoint /users, which returns an array of JSON objects representing user data. A users array is also defined and hard-coded with sample data.

Finally, the server is started by calling the listen method on the app object, which listens for incoming requests on the specified port, logs a success message to the console, and starts the server.

In summary, this code sets up a Node.js server using Express and MongoDB to provide a REST API for managing user data. It defines endpoints for adding and retrieving users, connects to a MongoDB server using the MongoClient library, and logs incoming data to the console.
 */