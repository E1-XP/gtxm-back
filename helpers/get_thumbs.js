const fs = require('fs'),
    path = require('path'),
    jimp = require('jimp');

module.exports = function getThumbnails(width) {

    for (let i = 1; i <= 4; i += 1) {
        const dirPath = path.join(__dirname, `../assets/img/${i}`);

        let files = fs.readdirSync(dirPath);

        for (file of files) {
            let stat = fs.statSync(path.join(dirPath, file));
            const thumbName = file.split('.')[0].concat('-thumbnail.jpg');

            if (stat && stat.isFile()) {
                jimp.read(path.join(dirPath, file))
                    .then(img => img.resize(width, jimp.AUTO)
                        .write(path.join(dirPath, `../thumbnails/${i}/`, thumbName)))
                    .catch(err => console.log(err));
            }
        }

    }
}