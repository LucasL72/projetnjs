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
  console.log("Je suis le controller Edit dans user", req.body)
  let image = req.file
  let firstname = req.body.firstname
  let name = req.body.name
  let password = req.body.password

  const user = await db.query(`SELECT * FROM user WHERE id = "${req.session.user.id}"`)

  if (firstname) {
    await db.query(`UPDATE user SET firstname="${req.body.firstname}" WHERE id = "${req.session.user.id}"`)
  }
  if (name) {
    await db.query(`UPDATE user SET name="${req.body.name}" WHERE id = "${req.session.user.id}"`)
  }
  if (image) {
    const dir = path.join('./public/data/users')
    deleteFile(dir, user[0].imguser)
    await db.query(`UPDATE user SET imguser = '${req.file.filename.split('.').slice(0, -1).join('.') + ".webp"}' WHERE id = "${req.session.user.id}"`)
  }
  if (password) {
    const hash = bcrypt.hashSync(password, 10)
    await db.query(`UPDATE user SET password = "${hash}" WHERE id ="${req.session.user.id}"`)
  }
  res.redirect("/user")
};