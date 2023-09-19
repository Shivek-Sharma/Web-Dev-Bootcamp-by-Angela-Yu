import mongoose from 'mongoose';

// Connect to "fruitsDB" database in mongoDB, create if it doesn't exist
mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

// Create a new Schema
const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

// Create "fruits" collection in database following schema of "fruitSchema"
const Fruit = mongoose.model("Fruit", fruitSchema);

// Create a document to insert
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "An apple a day keeps the doctor away"
});

// Insert the defined document into the "fruits" collection
// fruit.save().then(() => console.log("New fruit inserted successfully"));


const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "The best fruit!"
});

const orange = new Fruit({
    name: "Orange",
    rating: 6,
    review: "Rich in Vitamin C"
});

const banana = new Fruit({
    name: "Banana",
    rating: 8,
    review: "Very beneficial for health"
});

// await Fruit.insertMany([kiwi, orange, banana])


// find all documents
const fruits = await Fruit.find({});
console.log(fruits);

// Close the connection to mongoDB
mongoose.connection.close();


// Mongoose Model API Documentation
// https://mongoosejs.com/docs/api/model.html