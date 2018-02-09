const fs = require('fs'),
    path = require('path');

const db = require('../models');

module.exports.getImages = function (dirPath, dirId = 1) {
    let imageData = [];

    function stepA() {
        return new Promise((res, rej) => {
            let files = fs.readdirSync(dirPath);
            let i = 1 * dirId;

            for (file of files) {
                let stat = fs.statSync(path.join(dirPath, file));

                if (stat && stat.isFile()) imageData.push({
                    id: i,
                    dir: `static/img/${dirId}/${file}`,
                    likes: 99
                });
                i += 1;
            }
            res(imageData);
        });
    }

    function stepB(data) {
        function stepB2(data) {
            return new Promise((res, rej) => {
                db.Photo.find({}).then(photos => {
                    //data - original items sended thru promises
                    data.forEach(el => el.likes = photos.filter(photo => photo.id === el.id));
                    data.forEach(el => el.likes = el.likes[0].likes);
                    res(data);
                });
            });
        }
        return stepB2(data);
    }

    return stepA().then(stepB);
}
