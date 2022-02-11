/*
 * Controller: User
 * **************** */
const fs = require("fs");
const path = require('path');
const {
  deleteFile
} = require('../utils/deleteFile');
const bcrypt = require("bcrypt");

exports.userProfile = async (req, res) => {
  console.log('je suis la page user')
  res.render('user', {
    dbuser: await db.query(`SELECT * FROM user where id="${req.session.user.id}"`),
  })
};

exports.EditUser = async (req, res) => {
  console.log("Je suis le controller Edit dans user", req.body);
  const user = await db.query(`SELECT * FROM user WHERE id = "${req.session.user.id}"`)

  const {
    password
  } = req.body;

  const hash = bcrypt.hashSync(password, 10);

  await db.query(`UPDATE user SET imguser = "${req.file.filename}",
    firstname="${req.body.firstname}", name="${req.body.name}", password = "${hash}" WHERE id ="${req.session.user.id}"`)

  const dir = path.join('./public/data/users');
  deleteFile(dir, user[0].imguser)

  await db.query(`UPDATE user SET imguser = '${req.file.filename}' WHERE id = "${req.session.user.id}"`)
  res.redirect("/user")

};