/*
 * Controller: Page Register/ Nouvel utilisateur
 * **************** */
const bcrypt = require("bcrypt");

exports.registerpage = (req, res) => {
  console.log('je suis la page register')
  res.render("register");
}

exports.CreateUser = async (req, res) => {
  console.log("Je suis le register", req.body);

  const {
    pseudo,
    firstname,
    name,
    email,
    password
  } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  console.log("hash", hash);

  await db.query(`INSERT INTO user(imguser,pseudo,firstname,name,email,password) VALUES 
  ("${req.file.filename}","${pseudo}","${firstname}",
  "${name}","${email}","${hash}")`);

  res.render("user");

};

/*
 * Controller: lOG IN 
 * **************** */
exports.loginUser = (req, res) => {
  console.log("Je suis le login ", req.body);
  let email = req.body.email
  let password = req.body.password

  if (email && password) {
    db.query('SELECT * FROM user WHERE email = ?', [email], function (error, results, fields) {
      if (results.length > 0) {
        req.session.user = results[0]
        if (results[0].isAdmin === 1) {
          req.session.isAdmin = true
        }
        if (results[0].isBan === 1) {
          res.send("Vous êtes banni")
        }

        res.redirect(req.headers.referer)
        return;
      } else {
        res.redirect(req.headers.referer)
        return;
      }


    })
    console.log('Connect',req.body);
  }
}


exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("cookie_GDC")
    console.log(req.session)
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