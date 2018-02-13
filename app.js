const express = require('express'),
    app = express(),
    fs = require('fs'),
    path = require('path'),
    cors = require('cors'),
    PORT = process.env.PORT || 3001;

const db = require('./models');
const helpers = require('./helpers');

app.use(cors());

app.get('/', (req, res) => res.json({ message: "welcome to the gtxm backend" }));

app.use('/static', express.static(path.join(__dirname, 'assets')));

app.get('/static/img/:dir', helpers.getImages);

// for (let i = 1; i <= 108; i += 1) {
//     db.Photo.create({
//         id: i,
//     }).then(data => console.log('created ' + i));
// }

// db.Photo.count({}, function (err, c) {
//     console.log('total count: '+c);
// });

app.listen(PORT, () => console.log(`Server is listening on ${PORT}.`));