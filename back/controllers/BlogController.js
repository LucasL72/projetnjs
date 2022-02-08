/*
 * Controller: Blog & ID
 * **************** */
const fs = require("fs");
const path = require('path');

exports.blogpage = (req, res) => {
  console.log('je suis la page blog')
  // Variable de récupération de tout les articles
  let sql = `SELECT * FROM articles`;
  db.query(sql, (error, data, fields) => {
    if (error) throw error;
    res.render('blog', {
      status: 200,
      dbarticles: data,
      message: "article lists retrieved successfully"
    })
  })
};

/** Controller: ID* **************** */

exports.idpage = async (req, res) => {
  console.log('je suis la page Blog id')

  res.render('blog-id', {
    dbarticles: await db.query(`SELECT * FROM articles WHERE title ="${req.params.title}"`),
    dbcommentaires: await db.query(`SELECT * FROM  commentaires INNER JOIN articles ON commentaires.articles_id=articles.id WHERE articles.title="${req.params.title}"`),
  })
};

exports.CreateCom = async (req, res) => {
  console.log("Je suis le controller Create Com dans blog-id", req.body);

  const articleID = await db.query(` SELECT * FROM articles WHERE title ="${req.params.title}"`)

  await db.query(`INSERT INTO commentaires(content,pseudouser,imguser,user_id,articles_id) 
  VALUES("${req.body.content}","${req.session.user.pseudo}","${req.session.user.imguser}","${req.session.user.id}","${articleID[0].id}") `)
  
  res.redirect('back')

};
