import express from 'express';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser'; //HTTP request body parsing middleware

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.post('/submit', (req, res) => {
    console.log(req.body)
    res.send(`<p>Name: ${req.body.name} and Email: ${req.body.email}</p>`)
});

app.listen(port, () => {
    console.log(`App running at port ${port}`)
});