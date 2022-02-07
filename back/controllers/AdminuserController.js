/*
 * Controller: Page Admin
    Partie user
 * **************** */

exports.adminShow = async (req, res) => {
    console.log('je suis la page Admin')
    // Variable de récupération de tout les articles
    let sql = `SELECT * FROM articles,pics,user`;

    const articles = await db.query(`SELECT * FROM articles`);
    const pics = await db.query('select * from pics;');
    const user = await db.query('select * from user;');
    const coms = await db.query(`SELECT * FROM  commentaires`);
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
    await db.query(`UPDATE user SET imguser = "${req.file.filename}",
      firstname="${req.body.firstname}", name="${req.body.name}" WHERE id = "${req.params.id}"`);
  res.redirect("/admin")
};

exports.adminDeleteUser = async (req, res) => {
    console.log("Je suis le controller Delete dans Admin", req.params.id);
    await db.query(`DELETE FROM user WHERE id="${req.params.id}"`)
    res.redirect('/admin')};

exports.banUser = async (req, res) => {
    console.log(" BAN:", req.params.id);
    await db.query(`UPDATE user SET isBan = 1 WHERE id = ${req.params.id}`)
    res.redirect('/admin')
};

/*
 * ***************************************************** */