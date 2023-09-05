import inquirer from 'inquirer'; //stdin stdout in node
import qr from 'qr-image';
import fs from 'fs';

inquirer
    .prompt([{
        message: "Enter URL here: ",
        name: "URL"
    }])
    .then(answers => {
        //console.log(answers)
        const url = answers.URL;

        const qr_png = qr.image(url);
        qr_png.pipe(fs.createWriteStream('url.png'));
    });