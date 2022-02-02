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
  console.log('je suis la page Blog:id')
  res.render('blog-id', {
    dbarticles: await db.query(`SELECT * FROM articles WHERE title ="${req.params.title}"`),
    dbcommentaires: await db.query(`SELECT * FROM commentaires`)
  })
}

exports.CreateCom = async (req, res) => {
  console.log("Je suis le controller Create Com dans blog-id", req.body);
  let sql = `INSERT INTO commentaires (content,pseudouser,datecom,user_id,articles_id) 
  values("${req.body.content}","${req.body.pseudouser}",NOW(),"1","28")`;

  let values = [
    req.body.content,
    req.body.pseudouser
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    let sql = `SELECT * FROM commentaires`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
      res.render('blog-id', {
        status: 200,
        dbcommentaires: data,
        message: "Add article successfully"
      })
    })
  })

};