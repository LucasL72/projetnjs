/*
 * Controller: Page Admin
 * **************** */ 

exports.adminpage = (req, res) => {
    console.log('je suis la page Admin')
  res.render("admin");
};

exports.adminCreate = (req, res) => {
  console.log("Je suis le controller Create dans Admin",req.body);
  res.redirect("/admin");
};

exports.adminEdit = (req, res) => {
  console.log("Je suis le controller Edit dans Admin",req.body);
  res.redirect("/admin");
};

exports.adminDelete = (req, res) => {
  console.log("Je suis le controller Delete dans Admin",req.body);
  res.redirect("/admin");
};

