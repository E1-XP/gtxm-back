const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://e1xp:admin@ds233238.mlab.com:33238/gtxm', {
    keepAlive: true,
    reconnectTries: Number.MIN_VALUE
});

module.exports.Photo = require('./photo');