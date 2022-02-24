/*
 * Controller: Page Admin
    Partie pics
 * **************** */
const fs = require("fs");
const path = require('path');
const {
    deleteFile
} = require('../utils/deleteFile');

/*----Méthode Post---*/
exports.adminCreatepic = async (req, res) => {
    console.log("Je suis le controller Create pics dans Admin", req.body);
    await db.query(`INSERT INTO pics (photo,authorname,user_id) values("${req.file.filename}","${req.body.authorname}","${req.session.user.id}");`)
    res.redirect('/admin')

};

/*----Méthode Delete pour un---*/
exports.adminDeleteOnepic = async (req, res) => {
    console.log("Je suis le controller Delete dans Admin", req.params.idphotos);
    const photos = await db.query(`SELECT * FROM pics WHERE idphotos = "${req.params.idphotos}"`)
    await db.query(`DELETE FROM pics WHERE idphotos="${req.params.idphotos}"`)
    const dir = path.join('./public/data/photos/')
    deleteFile(dir, photos[0].photo)
    res.redirect('/admin')
};