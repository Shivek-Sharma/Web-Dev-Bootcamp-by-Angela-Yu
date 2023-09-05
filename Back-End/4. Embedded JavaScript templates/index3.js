import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index3.ejs')
});

app.post('/submit', (req, res) => {
    console.log(req.body)
    res.render('index3.ejs', { nameLength: req.body.fName.length + req.body.lName.length })
});

app.listen(port, () => {
    console.log(`App running at port ${port}`)
});