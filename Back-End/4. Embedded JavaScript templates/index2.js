import express from "express";

const app = express();
const port = 3000;

const data = {
    title: "EJS Tags",
    seconds: new Date().getSeconds(),
    items: ["apple", "banana", "cherry"],
    htmlContent: "<em>This is some em text</em>"
};

app.get('/', (req, res) => {
    res.render('index2.ejs', data);
});

app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});