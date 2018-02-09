const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/gtxm', {
    keepAlive: true,
    reconnectTries: Number.MIN_VALUE
});

module.exports.Photo = require('./photo');