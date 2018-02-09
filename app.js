const express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    PORT = process.env.PORT || 3001;

const db = require('./models');
const helpers = require('./helpers');

app.get('/', (req, res) => {
    res.json({ message: "welcome to the gtxm backend" });
});

app.use('/static', express.static(path.join(__dirname, 'assets')));

app.get('/static/img/:dir', (req, res) => {
    const { dir } = req.params;
    const pathParam = path.join(__dirname, `assets/img/${dir}`);

    helpers.getImages(pathParam, dir)
        .then(images => res.status(200).json({ images }));
});

// for (let i = 1; i <= 108; i += 1) {
//     db.Photo.create({
//         id: i,
//     }).then(data => console.log('created ' + i));
// }

// db.Photo.count({}, function (err, c) {
//     console.log('total count: '+c);
// });

app.listen(PORT, () => console.log(`Server is listening on ${PORT}.`));