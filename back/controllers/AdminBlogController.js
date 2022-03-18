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
  const {
    title,
    description,
    contenu
  } = req.body;
  const imgArt = req.file.filename.split('.').slice(0, -1).join('.') + ".webp";
  const sql = `INSERT INTO articles SET imgarticle= :imgArt,title= :title ,description= :description,contenu= :contenu,user_id="${req.session.user.id}";`
  await db.query(sql, {title,description,contenu,imgArt},function (err) {
  if (err) throw err
  console.log("Article créés")
  res.redirect("/admin")
  })
};


/*----Méthode PUT --------*/
exports.adminEditBlog = async (req, res) => {
  console.log("Je suis le controller Edit dans Admin", req.body);
  const {title,description,contenu} = req.body
  let image = req.file
  const article = await db.query(`SELECT * FROM articles WHERE id = "${req.params.id}"`)

  if (title) {
    await db.query(`UPDATE articles SET title = :title WHERE id = "${req.params.id}"`,{title})
  }
  if (image) {
    const dir = path.join('./public/data/articles');
    deleteFile(dir, article[0].imgarticle)
    await db.query(`UPDATE articles SET imgarticle = '${req.file.filename.split('.').slice(0, -1).join('.') + ".webp"}' WHERE id = "${req.params.id}"`)
  }
  if (description) {
    await db.query(`UPDATE articles SET description = :description WHERE id = "${req.params.id}"`,{description})
  }
  if (contenu) {
    await db.query(`UPDATE articles SET contenu = :contenu WHERE id = "${req.params.id}"`,{contenu})
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