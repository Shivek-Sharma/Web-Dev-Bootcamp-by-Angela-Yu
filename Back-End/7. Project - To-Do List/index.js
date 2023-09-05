import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

const taskList = [];
const shopList = [];

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', { tasks: taskList })
})

app.get('/shopping', (req, res) => {
    res.render('shopping.ejs', { tasks: shopList })
})

app.post('/submit', (req, res) => {
    console.log(req.body)
    taskList.push(req.body.task)
    res.redirect('/')
})

app.post('/shopping/submit', (req, res) => {
    console.log(req.body)
    shopList.push(req.body.task)
    res.redirect('/shopping')
})

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});