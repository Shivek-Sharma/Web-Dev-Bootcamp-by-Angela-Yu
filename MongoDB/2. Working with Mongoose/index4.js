// Establishing Relationships and Embedding Documents

import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB');

const fruitSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

const fruit = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "Taste is nice"
});

// fruit.save()

const person1 = new Person({
    name: "John",
    age: 37
});

const person2 = new Person({
    name: "Amy",
    age: 19,
    favoriteFruit: fruit
});

// person1.save()
// person2.save()

await Person.find({})
    .then((persons) => console.log(persons))
    .catch((err) => console.log(err));

mongoose.connection.close();