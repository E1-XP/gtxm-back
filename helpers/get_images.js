const fs = require('fs'),
    path = require('path');
const db = require('../models');

module.exports = function getImages(req, res) {
    const { dir } = req.params;
    const pathParam = path.join(__dirname, `../assets/img/${dir}`);

    getImagesCore(pathParam, dir)
        .then(images => res.status(200).json({ images }));
}

function getImagesCore(dirPath, dirId = 1) {

    let imageData = [];

    function populateImageDataArrayWithObjects() {
        return new Promise((res, rej) => {
            let files = fs.readdirSync(dirPath);
            let i = 1 * dirId;

            for (file of files) {
                let stat = fs.statSync(path.join(dirPath, file));
                const thumbName = file.split('.')[0].concat('-thumbnail.jpg');

                if (stat && stat.isFile()) imageData.push({
                    id: i,
                    dir: `static/img/${dirId}/${file}`,
                    thumbnail: `static/img/thumbnails/${dirId}/${thumbName}`,
                    likes: 99
                });
                i += 1;
            }
            res(imageData);
        });
    }

    function updateLikesFieldForEachImageDataItem(data) {
        return (function coreFn(data) {
            return new Promise((res, rej) => {
                db.Photo.find({}).then(photos => {
                    //data - original items send thru promises
                    data.forEach(item => item.likes = photos.filter(photo => photo.id === item.id));
                    data.forEach(item => item.likes = item.likes[0].likes);
                    res(data);
                }).catch(err => console.log(err));
            });
        })(data);
    }

    return populateImageDataArrayWithObjects().then(updateLikesFieldForEachImageDataItem).catch(err => console.log(err));
}