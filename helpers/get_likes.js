const fs = require('fs'),
    path = require('path');
const db = require('../models');

module.exports = function getImagesCore(dirPath, dirId = 1) {

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

        function coreFn(data) {
            return new Promise((res, rej) => {
                db.Photo.find({}).then(photos => {
                    //data - original items send thru promises
                    data.forEach(item => item.likes = photos.filter(photo => photo.id === item.id));
                    data.forEach(item => item.likes = item.likes[0].likes);
                    res(data);
                });
            });
        }
        return coreFn(data);
    }

    return populateImageDataArrayWithObjects().then(updateLikesFieldForEachImageDataItem);
}