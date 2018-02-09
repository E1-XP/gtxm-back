const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    likes: {
        type: Number,
        required: true,
        default: 0
    }
})

const Photo = mongoose.model('Photo', PhotoSchema);
module.exports = Photo;