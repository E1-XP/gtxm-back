const fs = require('fs'),
    path = require('path');
const db = require('../models');

const getImagesCore = require('./get_images');

module.exports.getThumbnails = require('./get_thumbs');

module.exports.setLikes = require('./set_likes');

module.exports.createThumbnails = require('./create_thumbs');

module.exports.getImages = function (req, res) {
    const { dir } = req.params;
    const pathParam = path.join(__dirname, `../assets/img/${dir}`);

    getImagesCore(pathParam, dir)
        .then(images => res.status(200).json({ images }));
}