/*
 * Controller: Blog & ID
 * **************** */
const dbBlog2 = require('../../public/dbbackup.json').blog2

exports.blogpage = (req, res) => {
  console.log('je suis la page blog')
  res.render("blog", {
    dbBlog2
  });
};

/** Controller: ID* **************** */

exports.idpage = (req, res) => {
  console.log('je suis la page Id')
  res.render("blog-id");
};

exports.CreateCom = (req, res) => {
  console.log("Je suis le controller Create Com dans blog-id", req.body);
  res.render("blog-id");
}

exports.EditCom = (req, res) => {
  console.log("Je suis le controller Edit Com dans blog-id", req.params.id, req.body);
  res.render("blog-id");
  // res.redirect('/blog-id')
}