/*
 * Controller: Home
 * **************** */
exports.homepage = (req, res) => {
    console.log('je suis la page home')
  res.render("home");
};

exports.CreateMessage = (req, res) => {
  console.log("Je suis le controller Create Message dans Home",req.body);
  res.render("home");
}
