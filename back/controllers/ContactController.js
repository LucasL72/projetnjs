/*
 * Controller: Contact
 * **************** */ 

exports.contactpage = (req, res) => {
    console.log('je suis la page contact')
  res.render("contact");
};

exports.CreateMessage = (req, res) => {
  console.log("Je suis le controller Create Message dans contact",req.body);
  res.render("contact");
}
