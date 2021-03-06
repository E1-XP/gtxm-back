const router = require('express').Router();
const helpers = require('../helpers');

router.get('/', (req, res) => res.json({ message: "welcome to the gtxm backend" }));

router.get('/static/img/thumbnails', helpers.getThumbnails);

router.get('/static/img/:dir', helpers.getImages);

router.post(`/likes/new/:loadedPart/:currentImage`, helpers.setLikes);

module.exports = router;