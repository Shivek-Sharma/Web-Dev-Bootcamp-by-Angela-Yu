import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import encrypt from 'mongoose-encryption';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(encrypt, { secret: process.env.SECRET_KEY, encryptedFields: ["password"] });

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    await newUser.save()
        .then(() => res.render("secrets"))
        .catch((err) => console.error(err));
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    await User.findOne({ email: username })
        .then((user) => {
            if (user.password === password) {
                res.render("secrets");
            } else {
                console.log("Wrong password");
            }
        })
        .catch((err) => console.error(err));
});

app.listen(port, () => {
    console.log(`App running at port ${port}`);
});