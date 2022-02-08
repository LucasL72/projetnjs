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
    let sql = `SELECT * FROM articles,pics,user,commentaires`;
    const articles = await db.query('select * from articles;');
    const pics = await db.query('select * from pics;');
    const user = await db.query('select * from user;');
    const coms = await db.query(`SELECT * FROM  commentaires `);

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
    await db.query(`INSERT INTO pics (photo,authorname,user_id) values("${req.file.filename}","${req.body.authorname}","${req.session.user.id}");`)

    res.redirect('/admin')

};

/*----Méthode Delete pour un---*/
exports.adminDeleteOnepic = async (req, res) => {
    console.log("Je suis le controller Delete dans Admin", req.params.idphotos);

    await db.query(`DELETE FROM pics WHERE idphotos="${req.params.idphotos}"`)
    const directory = path.resolve("./public/data/photos/");

    fs.readdir(directory, (err, files) => {
        if (err) console.log(err);
        else {
            for (const file of files) {
                fs.unlink(path.join(directory, file), (err) => {
                    if (err) console.log(err);
                    else console.log("Delete file" + file);
                });
            }
            // quand la boucle est fini
            console.log(files);
        }
    });
    res.redirect('/admin')
};