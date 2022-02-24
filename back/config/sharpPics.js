const sharp = require('sharp'),
    path = require("path"),
    fs = require('fs');

module.exports = (req, res, next) => {
    if (req.file || req.files) {
        for (let i = 0; i < req.file.length; i++) {
            let pathSharp = "./public/data/photos/"
            const file = req.files;

            sharp(file[i].path)
                .resize({ fit: sharp.fit.cover})
                .webp({ quality: 100 })
                .toFile(pathSharp + file[i].filename.split('.').slice(0, -1).join('.') + ".webp", (err, info) => { })
                .toBuffer()
                .then(() => {
                    pathImg = path.resolve("./public/data/photos/" + req.files[i].filename)
                    fs.unlink(pathImg, (err) => {
                        if (err) console.log(err)
                    })
                })
                .catch(err => console.log(err));
        }
    next();
    } else next()
}