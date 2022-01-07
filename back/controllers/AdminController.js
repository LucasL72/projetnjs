/*
 * Controller: Page Admin
 * **************** */
const fs = require("fs");

exports.adminPage = (req, res) => {
  console.log('je suis la page register')
  res.render("admin");
}

/*
 * Controller: Page Admin
    Partie user
 * **************** */
/*
exports.adminUser = (req, res) => {
  console.log('je suis la page Admin')
  // Variable de récupération de tout les articles
  let sql = `SELECT * FROM user`;
  db.query(sql, (error, data, fields) => {
    if (error) throw error;
    res.render('admin', {
      status: 200,
      dbuser: data,
      message: "article lists retrieved successfully"
    })
  })
}
exports.adminCreateUser = (req, res) => {
  console.log("Je suis le controller Create dans Admin", req.body);
  let sql = `INSERT INTO user (pseudo,name,email) values(?)`;
  let values = [
    req.body.pseudo,
    req.body.name,
    req.body.email
    
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    let sql = `SELECT * FROM user`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
      res.render('admin', {
        status: 200,
        dbuser: data,
        message: "Add user successfully"
      })
    })
  })

};
*/



/*
 * ***************************************************** */
/*

/*
 * Controller: Page Admin
    Partie blog
 * **************** */

exports.adminBlog = (req, res) => {
  console.log('je suis la page Admin')
  // Variable de récupération de tout les articles
  let sql = `SELECT * FROM articles`;
  db.query(sql, (error, data, fields) => {
    if (error) throw error;
    res.render('admin', {
      status: 200,
      dbarticles: data,
      message: "article lists retrieved successfully"
    })
  })
}

exports.adminCreateBlog = (req, res) => {
  console.log("Je suis le controller Create dans Admin", req.body);
  let sql = `INSERT INTO articles (title,description) values(?)`;
  let values = [
    req.body.title,
    req.body.description
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    let sql = `SELECT * FROM articles`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
      res.render('admin', {
        status: 200,
        dbarticles: data,
        message: "Add article successfully"
      })
    })
  })

};

exports.adminEditBlog = (req, res) => {
  console.log("Je suis le controller Edit dans Admin", req.body);
  res.render("/admin");
};

exports.adminDeleteOneBlog = (req, res) => {
  console.log("Je suis le controller Delete dans Admin", req.body);
  let sql = `DELETE FROM articles  WHERE id = ?`;
  let values = [
    req.params.id
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    let sql = `SELECT * FROM articles`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
      res.render('admin', {
        status: 200,
        dbarticles: data,
        message: "Delete article successfully"
      })
    })
  })
};

exports.adminDeleteAllBlog = (req, res) => {
  console.log("Je suis le controller Delete dans Admin", req.body);
  let sql = `DELETE FROM articles`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    let sql = `SELECT * FROM articles`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
      res.render('admin', {
        status: 200,
        dbArticle: data,
        message: "Delete All articles successfully"
      })
    })
  })
};

/*
 * ***************************************************** */
