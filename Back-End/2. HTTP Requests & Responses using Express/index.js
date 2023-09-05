import express from 'express';

const app = express();
const port = 3000;

// Route Handlers
app.get('/', (req, res) => {
    res.send("<h1>Home Page</h1>")
});

app.get('/about', (req, res) => {
    res.send("<h1>About Me</h1>")
});

app.post('/register', (req, res) => {
    res.sendStatus(201)
});

app.put('/user/shivek', (req, res) => {
    res.sendStatus(200)
});

app.patch('/user/shivek', (req, res) => {
    res.sendStatus(200)
});

app.delete('/user/shivek', (req, res) => {
    res.sendStatus(200)
});


app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});