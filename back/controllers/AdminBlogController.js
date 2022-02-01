/*
 * Controller: Page Admin
 * **************** */
const fs = require("fs");
const path = require('path');



/*
 * Controller: Page Admin
    Partie blog
 * **************** */


/*----Méthode Get---*/
exports.adminBlog = async (req, res) => {
  console.log('je suis la page Admin')
  // Variable de récupération de tout les articles
  let sql = `SELECT * FROM articles,pics`;

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
      message: "article lists retrieved successfully"
    })
  })
};
/*----Méthode Post---*/
exports.adminCreateBlog = async (req, res) => {
  console.log("Je suis le controller Create dans Admin", req.body);
  let sql = `INSERT INTO articles (imgarticle,title,description,user_id) values("${req.file.filename}","${req.body.title}","${req.body.description}","1");`
  let values = [
    req.file.filename,
    req.body.title,
    req.body.description
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    let sql1 = `SELECT * FROM articles,pics`;
    db.query(sql1, async (error, d, fields) => {
      if (error) throw error;
      console.log('datatatat', d)
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
        message: "Add article successfully"
      })
    })
  })

};
/*----Méthode PUT --------*/
exports.adminEditBlog = async (req, res) => {
  console.log("Je suis le controller Edit dans Admin", req.body);
  let sql = `UPDATE articles SET title = "${req.body.title}", description = "${req.body.description}" , imgarticle = "${req.file.filename}", user_id = '1' WHERE id = "${req.params.id}"`;
  /* (now) pour les dates*/
  let values = [
    req.body.title,
    req.body.description,
    req.file.filename
  ];

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    let sql1 = `SELECT * FROM articles,pics`;
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

/*----Méthode Delete pour un---*/
exports.adminDeleteOneBlog = async (req, res) => {
  console.log("Je suis le controller Delete dans Admin", req.body);
  let sql = `DELETE FROM articles  WHERE id = ?`;
  let values = [
    req.params.id
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    let sql1 = `SELECT * FROM articles,pics`;
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
        message: "Delete one article successfully"
      })
    })
  })
};

/*----Méthode Delete pour tout---*/
exports.adminDeleteAllBlog = async (req, res) => {
  console.log("Je suis le controller Delete dans Admin", req.body);
  let sql = `DELETE FROM articles`;

  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    let sql = `SELECT * FROM articles`;
    db.query(sql, async (error, data, fields) => {
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
        message: "Delete All Customer successfully"
      })
    })
  })
};

/*
 * ***************************************************** */