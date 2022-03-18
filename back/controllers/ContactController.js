/*
 * Controller: Contact
 * **************** */

exports.contactpage = (req, res) => {
  console.log("je suis la page contact");
  res.render("contact");
};

exports.CreateMessage = async (req, res) => {
  console.log("Je suis le controller Create Message ", req.body);

  const { email, content, author } = req.body;
  await db.query(
    `INSERT INTO messages (email,content,author) 
    VALUES(:email,:content,:author);`,
    { email, content, author }
  );
  res.redirect("back");
};
