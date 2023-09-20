// Updating and Deleting Data

import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const Peach = new Fruit({
    rating: 10,
    review: "Peaches are so yummy"
});

// await Peach.save().then(() => console.log("Entry for peach inserted successfully"))

// Updating name in Peach entry
await Fruit.updateOne({ _id: "650977406375d1a5c22646b3" }, { name: "Peach" })
    .then(() => console.log("Name updated successfully"))
    .catch((err) => console.log(err));

// Deleting extra Peach entry
await Fruit.deleteOne({ _id: "6509769015a922454b7a1384" })
    .then(() => console.log("Data deleted successfully"))
    .catch((err) => console.log(err));

await Fruit.find({})
    .then((fruits) => {
        fruits.forEach((fruit) => {
            console.log(`${fruit.name}: ${fruit.rating}/10`);
        });
    })
    .catch((err) => console.log(err));


mongoose.connection.close();