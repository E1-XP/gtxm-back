const fs = require("fs"),
  path = require("path");
const db = require("../models");

module.exports = function getImages(req, res) {
  const { dir } = req.params;
  const pathParam = path.join(__dirname, `../assets/img/${dir}`);

  getImagesCore(pathParam, dir).then(images =>
    res.status(200).json({ images })
  );
};

function getImagesCore(dirPath, dirId = 1) {
  let imageData = [];

  function populateImageDataWithObjects() {
    return new Promise((res, rej) => {
      let files = fs.readdirSync(dirPath);
      let i = Number(dirId) === 1 ? 1 : 27 * (Number(dirId) - 1) + 1;

      for (file of files) {
        let stat = fs.statSync(path.join(dirPath, file));
        const baseURL = "static/img/";
        const thumbName = file.split(".")[0].concat("-thumbnail.jpg");
        const lazyName = file.split(".")[0].concat("-lazy.jpg");

        if (stat && stat.isFile())
          imageData.push({
            id: i,
            dir: `${baseURL}${dirId}/${file}`,
            thumbnail: `${baseURL}thumbnails/${dirId}/${thumbName}`,
            lazy: `${baseURL}thumbnails/${dirId}/${lazyName}`,
            likes: 99
          });

        i += 1;
      }
      res(imageData);
    });
  }

  function updateLikesFieldForEachImageData(data) {
    return (function coreFn(data) {
      return new Promise((res, rej) => {
        db.Photo.find({})
          .then(photos => {
            data.map(
              item =>
                (item.likes = photos
                  .filter(photo => photo.id === item.id)
                  .map(photo => photo.likes)[0])
            );

            res(data);
          })
          .catch(err => console.log(err));
      });
    })(data);
  }

  return populateImageDataWithObjects()
    .then(updateLikesFieldForEachImageData)
    .catch(err => console.log(err));
}
