/*
 * Controller: Home
 * **************** */
/*const {
  formatterDate
} = require('../../utils')*/

exports.homepage = async (req, res) => {

  console.log("Je suis la page Home")

    res.render("home", {
      dbarticles: await db.query(`SELECT * FROM articles ORDER BY dateart DESC LIMIT 3`),
    })
};

exports.mention = async (req, res) => {

  console.log("Je suis la page CGU")

  res.render("cgu")
};