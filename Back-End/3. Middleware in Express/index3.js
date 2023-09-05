import express from 'express';

const app = express();
const port = 3000;

// defining custom middleware (Note: Order of middleware matters)
const my_logger = (req, res, next) => {
    console.log(`Request method: ${req.method} & Response code: ${res.statusCode}`)
    next(); // jumps to route handlers or next middleware if it exists
}

app.use(my_logger);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(port, () => {
    console.log(`App running at port ${port}`)
});