/*
 * Controller: Blog & ID
 * **************** */ 

exports.blogpage = (req, res) => {
    console.log('je suis la page blog')
  res.render("blog");
};


/** Controller: ID* **************** */ 

exports.idpage = (req, res) => {
  console.log('je suis la page Id')
res.render("blog-id");
};