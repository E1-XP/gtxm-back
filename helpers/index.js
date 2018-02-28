const fs = require('fs'),
    path = require('path');
const db = require('../models');

module.exports.getImages = require('./get_images');

module.exports.getThumbnails = require('./get_thumbs');

module.exports.setLikes = require('./set_likes');

module.exports.createThumbnails = require('./create_thumbs');

