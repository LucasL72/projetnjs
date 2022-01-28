/*
 * Controller: Page Admin
    Partie pics
 * **************** */
const fs = require("fs");
const path = require('path');

/*----Méthode Get---*/
exports.adminpics = (req, res) => {
    console.log('je suis la page Admin')
    // Variable de récupération de tout les articles
    let sql = `SELECT * FROM articles,pics`;
    db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.render('admin', {
            status: 200,
            dbarticles: data,
            dbpics: data,
            message: "article lists retrieved successfully"
        })
    })
}
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
        let sql = `SELECT * FROM articles,pics`;
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.render('admin', {
                status: 200,
                dbpics: data,
                dbarticles: data,
                message: "Add Photo successfully"
            })
        })
    })

};

/*----Méthode Delete pour un---*/
exports.adminDeleteOnepics = async (req, res) => {
    console.log("Je suis le controller Delete pics dans Admin", req.body);
    let sql = `DELETE FROM pics  WHERE id = ?`;
    let values = [
        req.params.id
    ];
    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        let sql = `SELECT * FROM articles,pics`;
        db.query(sql, (error, data, fields) => {
            if (error) throw error;
            res.render('admin', {
                status: 200,
                dbpics: data,
                dbarticles :data,
                message: "Delete article successfully"
            })
        })
    })
};