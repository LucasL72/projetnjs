/*
 * Controller: Page Admin
    Partie user
 * **************** */

exports.adminShow = async (req, res) => {
    console.log('je suis la page Admin')
    // Variable de récupération de tout les articles
    let sql = `SELECT * FROM articles,pics,user`;

    const articles = await db.query('select * from articles;');
    const pics = await db.query('select * from pics;');
    const user = await db.query('select * from user;');
    const coms = await db.query('select * from commentaires;');
    //console.log('article', articles)

    db.query(sql, (error, data, fields) => {
        if (error) throw error;
        res.render('admin', {
            status: 200,
            dbuser: user,
            dbarticles: articles,
            dbcommentaires: coms,
            dbpics: pics,
            message: "Admin Gestion lists retrieved successfully"
        })
    })
};

exports.adminEditUser = async (req, res) => {
    console.log("Je suis le controller Edit dans user", req.body);
    let sql = `UPDATE user SET imguser = "${req.file.filename}",
      firstname="${req.body.firstname}", name="${req.body.name}" WHERE id = "${req.params.id}"`;
    /* (now) pour les dates*/
    let values = [
        req.file.filename,
        req.body.firstname,
        req.body.name,
        req.body.email,
        req.body.password
    ];

    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        let sql1 = `SELECT * FROM user`;
        db.query(sql1, async (error, d, fields) => {
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
                message: "edit article successfully"
            })
        })
    })
};

exports.adminDeleteUser = async (req, res) => {
    console.log("Je suis le controller Delete user  dans Admin", req.body);
    let sql = `DELETE FROM user where id = "${req.params.id}"`;
    let values = [
        req.params.id
    ];

    db.query(sql, [values], function (err, data, fields) {
        if (err) throw err;
        let sql1 = `SELECT * FROM user`;
        db.query(sql1, async (error, d, fields) => {
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
                message: "Delete user successfully"
            })
        })
    })
};

/*
 * ***************************************************** */