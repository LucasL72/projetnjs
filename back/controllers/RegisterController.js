/*
 * Controller: Page Register/ Nouvel utilisateur
 * **************** */
exports.registerpage = (req, res) => {
  console.log('je suis la page register')
  res.render("register");
}

exports.CreateUser = (req, res) => {
  console.log("Je suis le controller Create User dans register", req.body);
  res.render("register");
}

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


