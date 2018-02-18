const fs = require('fs'),
    path = require('path');
const db = require('../models');

const getImagesCore = require('./get_likes');

module.exports.getImages = function (req, res) {
    const { dir } = req.params;
    const pathParam = path.join(__dirname, `../assets/img/${dir}`);

    getImagesCore(pathParam, dir)
        .then(images => res.status(200).json({ images }));
}

module.exports.getThumbnails = require('./get_thumbs');


