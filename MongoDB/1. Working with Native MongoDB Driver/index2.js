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

        // Create a document to insert
        const doc = {
            _id: 3,
            name: "Rubber",
            price: 0.5,
            stock: 52
        }
        // Insert the defined document into the "products" collection
        const result = await products.insertOne(doc);
        // Print the ID of the inserted document
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);