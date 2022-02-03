/*
 * Controller: User
 * **************** */

exports.userProfile = async (req, res) => {
  console.log('je suis la page user')
  res.render('user', {
    dbuser: await db.query(`SELECT * FROM user where id="${req.session.user.id}"`),
  })
};

exports.EditUser = async (req, res) => {
  console.log("Je suis le controller Edit dans user", req.body);
  let sql = `UPDATE articles SET imguser = "${req.file.filename}", pseudo = "${req.body.pseudo},
    firstname="${req.body.firstname}, name="${req.body.name}", email="${req.body.email}"
    password="${req.body.password}"`;
  /* (now) pour les dates*/
  let values = [
    req.file.filename,
    req.body.pseudo,
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
      const user = await db.query('select * from user;');
      res.render('admin', {
        status: 200,
        dbuser: user,
        message: "edit article successfully"
      })
    })
  })
};