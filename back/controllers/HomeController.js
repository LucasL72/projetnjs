/*
 * Controller: Home
 * **************** */
const {
  formatterDate
} = require('../../utils')

exports.homepage = (req, res) => {
  const dateNoFormat = '2022-01-27 16:27:00'
  const newDate = formatterDate(dateNoFormat)


  console.log('newDate', newDate)
  res.render("home");
};

exports.CreateMessage = (req, res) => {
  console.log("Je suis le controller Create Message dans Home", req.body);
  res.render("home");
}