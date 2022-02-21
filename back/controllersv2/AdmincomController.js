/*
 * Controller: Page Admin
    Partie coms
 * **************** */
const fs = require("fs");
const path = require('path');


/*----Méthode Delete pour un---*/
exports.adminDeleteOnecom = async (req, res) => {
    console.log("Je suis le controller Delete dans admin", req.params.idcommentaire);
    await db.query(`DELETE FROM commentaires WHERE idcommentaire="${req.params.idcommentaire}"`)
    res.redirect('/admin')
};

exports.MyMessages = async (req, res) => {
    console.log("je suis la page des Messages")
    res.render("messages", {
        dbmessages: await db.query(`SELECT * FROM messages`),
    })
};
exports.MessDelete = async (req, res) => {
    console.log("Je suis le controller Delete dans messages", req.params.id);
    await db.query(`DELETE FROM messages WHERE id="${req.params.id}"`)
    res.redirect('/messages')
};