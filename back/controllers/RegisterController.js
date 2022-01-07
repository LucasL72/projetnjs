/*
 * Controller: Page Register/ Nouvel utilisateur
 * **************** */
exports.registerpage = (req, res) => {
  console.log('je suis la page register')
  res.render("register");
}

exports.CreateUser = (req, res) => {
  console.log("Je suis le controller Create dans Admin", req.body);
  let sql = `INSERT INTO user (pseudo,name,firstname,email) values(?)`;
  let values = [
    req.body.pseudo,
    req.body.name,
    req.body.firstname,
    req.body.email
  ];
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    let sql = `SELECT * FROM user`;
    db.query(sql, (error, data, fields) => {
      if (error) throw error;
      res.render('register', {
        status: 200,
        dbuser: data,
        message: "Add user successfully"
      })
    })
  })

};

exports.MulterImg = (req,res) => {
  console.log("je suis le controller Multer",req.file, req.body);
  res.render("register");
}
/*
 * Controller: lOG IN 
 * **************** */
exports.loginUser = (req, res) => {
  console.log("Je suis le controller Create mess pour le login", req.body);
  res.redirect(req.headers.referer)
}

/*
 * Controller: lOST PASSWORD
 * **************** */
exports.lostpassword = (req, res) => {
  console.log("Je suis le controller Create mess pour le Mot de passse oublié", req.body);
  res.redirect(req.headers.referer)
}

/*
 * Controller: Newletter
 * **************** */
exports.newsletter = (req, res) => {
  console.log("Je suis le controller Create mess pour la Newsletter", req.body);
  res.redirect(req.headers.referer)
}


