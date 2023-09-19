// MongoDB Official Documentation 
// https://www.mongodb.com/docs/drivers/node/current/quick-start/connect-to-mongodb/

import { MongoClient } from "mongodb";

// Connection URI
const uri = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.6';

// Create a new client and connect to MongoDB
const client = new MongoClient(uri);

async function run() {
    try {
        // Connect to the "shopDB" database and access its "products" collection
        const database = client.db('shopDB');
        const products = database.collection('products');

        // Query for the pen product
        const query = { name: 'Pen' };
        const product = await products.findOne(query);
        console.log(product);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);