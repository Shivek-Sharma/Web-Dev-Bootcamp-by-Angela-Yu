import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/userDB");

const userSchema = {
    email: String,
    password: String
};

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
    const salt = bcryptjs.genSaltSync(saltRounds);
    const hash = bcryptjs.hashSync(req.body.password, salt);

    const newUser = new User({
        email: req.body.username,
        password: hash
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
            if (bcryptjs.compareSync(password, user.password)) {
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