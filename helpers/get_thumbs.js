module.exports = function getThumbnails(req, res) {
    const images = [[
        `static/img/thumbnails/1/71h71-thumbnail.jpg`,
        `static/img/thumbnails/1/F2005a2-thumbnail.jpg`,
        `static/img/thumbnails/1/WECS15a3-thumbnail.jpg`
    ],
    [
        `static/img/thumbnails/2/bt52Mo-thumbnail.jpg`,
        `static/img/thumbnails/2/P611c1-thumbnail.jpg`,
        `static/img/thumbnails/2/LBGP14p2b-thumbnail.jpg`
    ],
    [
        `static/img/thumbnails/3/917v2c222-thumbnail.jpg`,
        `static/img/thumbnails/3/LBTurbo78-thumbnail.jpg`,
        `static/img/thumbnails/3/AMRxRSRf-thumbnail.jpg`
    ],
    [
        `static/img/thumbnails/4/S1PP2-thumbnail.jpg`,
        `static/img/thumbnails/4/787LMpng-thumbnail.jpg`,
        `static/img/thumbnails/4/DRM-BetaNuer7-thumbnail.jpg`
    ]
    ];
    res.status(200).json(images);
}