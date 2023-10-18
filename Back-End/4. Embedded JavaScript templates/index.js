import express from 'express';
// import { dirname } from 'path'
// import { fileURLToPath } from 'url'

const app = express();
const port = 3000;
// const __dirname = dirname(fileURLToPath(import.meta.url))

const date = new Date();
const weekDay = date.getDay();

app.get('/', (req, res) => {
    console.log(weekDay);
    res.render('index.ejs', { getDay: weekDay }); //no need to use __dirname when 'index.ejs' is in './views'
});

app.listen(port, () => {
    console.log(`App running at port ${port}`)
});