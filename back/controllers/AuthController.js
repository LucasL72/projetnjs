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
  const imgUser = req.file.filename.split('.').slice(0, -1).join('.') + ".webp";

  const hash = bcrypt.hashSync(password, 10);

  console.log("hash", hash);

  await db.query(`INSERT INTO user(imguser,pseudo,firstname,name,email,password) VALUES 
  ("${imgUser}","${pseudo}","${firstname}",
  "${name}","${email}","${hash}")`);

  res.redirect("/");

};

/*
 * Controller: lOG IN 
 * **************** */
exports.loginUser = (req, res) => {
  console.log("Je suis le login ", req.body);
  let email = req.body.email
  let password = req.body.password

  if (email && password) {
    db.query(`SELECT * FROM user WHERE email = "${req.body.email}"`, [email], function (error, results, fields) {
      if (results) {
        bcrypt.compare(password, results[0].password, (error, same) => {
          if (!same) {
            const notWorking = true
            res.render("register",{
              notWorking
            })
          } else if (results[0].isBan === 0) {
            if (results[0].isAdmin === 1) {
              req.session.isAdmin = true
            }
            req.session.user = results[0]
            res.redirect("/")
            console.log("C'est ok!");
            return;
          } else {
            const notWorking = true
            res.render("register",{
              notWorking
            })
            console.log("C'est pas ok....");
          }
        })
      }
    })
  }
};



exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("cookie_GDC")
    console.log(req.session)
    res.redirect("/");
  });
};

