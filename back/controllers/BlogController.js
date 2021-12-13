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

exports.CreateCom = (req, res) => {
  console.log("Je suis le controller Create Com dans blog-id",req.body);
  res.render("blog-id");
}

exports.EditCom = (req, res) => {
  console.log("Je suis le controller Edit Com dans blog-id",req.params.id,req.body);
  res.render("blog-id");
}

