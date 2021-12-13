/*
 * Controller: Page Register/ Nouvel utilisateur
 * **************** */ 

exports.registerpage = (req, res) => {
    console.log('je suis la page register')
  res.render("register");
}

exports.CreateUser = (req, res) => {
  console.log("Je suis le controller Create User dans register",req.body);
  res.render("register");
}