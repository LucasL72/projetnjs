/*
 * Controller: Page Register/ Nouvel utilisateur
 * **************** */
const bcrypt = require("bcrypt");

exports.registerpage = (req, res) => {
  console.log('je suis la page register')
  res.render("register");
}

exports.CreateUser = (req, res) => {
  console.log("Je suis le register", req.body);


  let values = [
    req.file.filename,
    req.body.pseudo,
    req.body.firstname,
    req.body.name,
    req.body.email,
    req.body.password
  ];

  const hash = bcrypt.hashSync(password, 10);

  console.log("hash",hash);

  let sql = `INSERT INTO user(imguser,pseudo,firstname,name,email,password) VALUES 
  ("${req.file.filename}","${req.body.pseudo}","${req.body.firstname}",
  "${req.body.name}","${req.body.email}","${hash}")`;

  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    let sql1 = `SELECT * FROM user`;
    db.query(sql1, (error, data, fields) => {
      if (error) throw error;
      res.render('/', {
        status: 200,
        dbuser: data,
        message: "Add user successfully"
      })
    })
  })

};

/*
 * Controller: lOG IN 
 * **************** */
exports.loginUser = (req, res) => {
  console.log("Je suis le controller Create mess pour le login", req.body);
  res.redirect(req.headers.referer)
}


exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("cookie");
    console.log(req.session);
    res.redirect("/");
  });
};
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