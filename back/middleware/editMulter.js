const path = require('path')
const fs = require('fs')
const {
    deleteFile
} = require('../utils/deleteFile')

module.exports = (req, res, next) => {
    const directory = path.resolve("./public/data");

    //** Method Sync **//

    fs.readdir(directory, (err, files) => {
        if (err) console.log(err);
        else {
            // if (files.length > 0) {
            for (const file of files) {
                deleteFile(directory, file)
                // fs.unlink(path.join(directory, file), (err) => {
                //     if (err) console.log(err);
                //     else next()
                // });
            }
            next()
        };
    })
};

//*** Method Async **//