/*
 * Controller: Page Admin
    Partie pics
 * **************** */
const fs = require("fs");
const path = require('path');

/*----Méthode Get---*/
exports.adminpics = async (req, res) => {
    console.log('je suis la page Admin pics')
    // Variable de récupération de tout les articles
    let sql = `SELECT * FROM articles,pics`;
    const articles = await db.query('select * from articles;');
    const pics = await db.query('select * from pics;');
    const user = await db.query('select * from user;');
    const coms = await db.query('select * from commentaires;');

    db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.render('admin', {
            status: 200,
            dbuser: user,
            dbarticles: articles,
            dbcommentaires: coms,
            dbpics: pics,
            message: "Pics lists retrieved successfully"
        })
    })
};
/*----Méthode Post---*/
exports.adminCreatepic = async (req, res) => {
    console.log("Je suis le controller Create pics dans Admin", req.body);
    let sql = `INSERT INTO pics (photo,authorname,user_id) values("${req.file.filename}","${req.body.authorname}","1");`
    let values = [
        req.file.filename,
        req.body.auhtorname
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        let sql1 = `SELECT * FROM articles,pics`;
        db.query(sql1, async (error, data, fields) => {
            if (error) throw error;
            const articles = await db.query('select * from articles;');
            const pics = await db.query('select * from pics;');
            const user = await db.query('select * from user;');
            const coms = await db.query('select * from commentaires;');
            res.render('admin', {
                status: 200,
                dbuser: user,
                dbarticles: articles,
                dbcommentaires: coms,
                dbpics: pics,
                message: "Add Photo successfully"
            })
        })
    })

};

/*----Méthode Delete pour un---*/
exports.adminDeleteOnepic = async (req, res) => {
    console.log("Je suis le controller Delete pics dans Admin", req.body);
    let sql = `DELETE FROM pics  WHERE idphotos = "${req.params.idphotos}"`;
    let values = [
        req.params.idphotos
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        let sql1 = `SELECT * FROM articles,pics`;
        db.query(sql1, async (error, data, fields) => {
            if (error) throw error;
            const articles = await db.query('select * from articles;');
            const pics = await db.query('select * from pics;');
            const user = await db.query('select * from user;');
            const coms = await db.query('select * from commentaires;');
            res.render("admin", {
                status: 200,
                dbuser: user,
                dbarticles: articles,
                dbcommentaires: coms,
                dbpics: pics,
                message: "Add Photo successfully"


            })
        })
    })
};