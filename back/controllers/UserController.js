/*
 * Controller: Galerie/pics
 * **************** */ 

exports.userProfile = (req, res) => {
    console.log('je suis la page user')
  res.render("user");
};
exports.EditUser = (req, res) => {
  console.log("Je suis le controller Edit User dans user",req.body);
  res.render("user");
}
