/*
 * Controller: Page Admin
 * **************** */
const fs = require("fs");
const path = require('path');
const {
  deleteFile
} = require('../utils/deleteFile');


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
  const coms = await db.query(`SELECT * FROM commentaires`);
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
  await db.query(`INSERT INTO articles (imgarticle,title,description,contenu,user_id) values("${req.file.filename}","${req.body.title}","${req.body.description}","${req.body.contenu}","${req.session.user.id}");`);
  res.redirect("/admin")
};
/*----Méthode PUT --------*/
exports.adminEditBlog = async (req, res) => {
  console.log("Je suis le controller Edit dans Admin", req.body);
  let title = req.body.title
  let image = req.file
  let description = req.body.description
  let contenu = req.body.contenu
  const article = await db.query(`SELECT * FROM articles WHERE id = "${req.params.id}"`)

  if (title) {
    await db.query(`UPDATE articles SET title ="${req.body.title}" WHERE id = "${req.params.id}"`)
  }
  if (image) {
    const dir = path.join('./public/data/articles');
    deleteFile(dir, article[0].imgarticle)
    await db.query(`UPDATE articles SET imgarticle = '${req.file.filename}' WHERE id = "${req.params.id}"`)
  }
  if (description) {
    await db.query(`UPDATE articles SET description = "${req.body.description}" WHERE id = "${req.params.id}"`)
  }
  if (contenu) {
    await db.query(`UPDATE articles SET contenu = "${req.body.contenu}" WHERE id = "${req.params.id}"`)
  }
  res.redirect('/admin')
};

exports.adminDeleteOneBlog = async (req, res) => {
  console.log("Je suis le controller Delete dans Admin", req.params.id);
  const article = await db.query(`SELECT * FROM articles WHERE id = "${req.params.id}"`)
  await db.query(`DELETE FROM articles WHERE id="${req.params.id}"`)
  const dir = path.join('./public/data/articles')
  deleteFile(dir, article[0].imgarticle)

  res.redirect('/admin')
};

/*----Méthode Delete pour tout---*/
exports.adminDeleteAllBlog = async (req, res) => {
  console.log("Je suis le controller Delete dans Admin", req.params.id);
  await db.query(`DELETE FROM articles`)

  const directory = path.resolve("./public/data/articles/");

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

/*
 * ***************************************************** */