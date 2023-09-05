import express from 'express';
import morgan from 'morgan'; //HTTP request logger middleware

const app = express();
const port = 3000;

//app.use(morgan('combined'))
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send("Hello, World!")
});

app.listen(port, () => {
    console.log(`App runnning at port ${port}`)
});