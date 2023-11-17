// Data Validation with Mongoose
// https://mongoosejs.com/docs/validation.html

import mongoose from 'mongoose';

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB')
    .then(() => console.log("MongoDB connected successfully"));

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
}, { timestamps: true } //adds 'createdAt' and 'updatedAt' field in the document
);

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 45,
    review: "An apple a day keeps the doctor away"
});

const fruit2 = new Fruit({
    rating: 10,
    review: "Peaches are so yummy"
});

// both gives error
// fruit.save()
// fruit2.save()