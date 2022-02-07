/*
 * Controller: Page Admin
    Partie coms
 * **************** */
const fs = require("fs");
const path = require('path');

/*----Méthode Post---*/
exports.adminCreatecom = async (req, res) => {
    console.log("Je suis le controller Create pics dans Admin", req.body);
    await db.query(`INSERT INTO commentaires (content,pseudouser,imguser,user_id,articles_id) values("${req.body.content}","${req.session.user.pseudo}","${req.session.user.imguser}","${req.session.user.id}","2");`)

    res.redirect('/admin')
};

/*----Méthode Delete pour un---*/
exports.adminDeleteOnecom = async (req, res) => {
    console.log("Je suis le controller Delete dans Admin", req.params.idcommentaire);
    await db.query(`DELETE FROM commentaires WHERE idcommentaire="${req.params.idcommentaire}"`)
    res.redirect('/admin')
};