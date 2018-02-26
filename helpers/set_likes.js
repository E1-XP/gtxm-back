const db = require('../models');

module.exports = function setLikes(req, res) {
    const { currentImage, loadedPart } = req.params;
    const id = Number(currentImage) + 1 * Number(loadedPart);

    db.Photo.findOne({ id }).then(photo => {
        return db.Photo.findByIdAndUpdate(photo._id, { likes: Number(photo.likes) + 1 }, { new: true })
            .then(photo2 => res.status(200).json(photo2));
    }).catch(err => console.log(err));
}