/*
 * Controller: Page Admin
 * **************** */
const dbBlog = require('../../public/db.json').blog
const fs = require("fs");


exports.adminpage = (req, res) => {
  console.log('je suis la page Admin')
  res.render("admin", {
    dbBlog,
  });
};
/*
exports.adminCreate = (req, res) => {
  console.log("Je suis le controller Create dans Admin", req.body);
  res.redirect("/admin");
};

exports.adminEdit = (req, res) => {
  console.log("Je suis le controller Edit dans Admin", req.body);
  res.redirect("/admin");
};

exports.adminDelete = (req, res) => {
  console.log("Je suis le controller Delete dans Admin", req.body);
  res.redirect("/admin");
};
*/


/*
 * Controller: Create/Edit/delete Cards depuis DB fictive
 * **************** */

// Crée article depuis formualire
exports.createArticle = (req, res) => {
  console.log("je suis le controller create card", req.body);
  const user = {
    id: dbBlog.length + 1,
    title: req.body.title,
    description: req.body.description,
  };

  dbBlog.push(user);

  let data = JSON.stringify({
    blog: dbBlog
  }, null, 2);

  fs.writeFile("./public/db.json", data, (err) => {
    if (err) console.log(err);
    console.log("Fichier Json Créé");
  });

  res.render("admin", {
    dbBlog,
  });
};
// =======================/

// Edit card==========

exports.editArticle = (req, res) => {
  console.log("je suis le controller edit Article", req.params.id, req.body);
  let index = 0
  const articleEdited = {
    id: Number(req.params.id),
    title: req.body.title,
    description: req.body.description
  }

  dbBlog.forEach(art => {
    console.log('loop', typeof art.id, typeof req.params.id)
    if (user.id === Number(req.params.id)) {
      console.log('indexof', dbBlog.indexOf(art))
      index = dbBlog.indexOf(art)
    }
  })

  dbBlog.splice(index, index - 1, articleEdited)
  dbBlog.slice(dbBlog.splice(index + 1, 1))

  let data = JSON.stringify({
    blog: dbBlog
  }, null, 4);

  fs.writeFile("./public/db.json", data, (err) => {
    if (err) console.log(err);
    console.log("Fichier Json Créé");
  });


  res.render("admin", {
    dbBlog
  });
  //res.redirect("/admin")
};
// =============/

// delete article

exports.deleteArticle = (req, res) => {
  console.log("je suis le controller delete Article", req.params.id, req.body);

  let index = 0

  dbBlog.forEach(user => {
    // console.log('loop', typeof art.id, typeof req.params.id)
    if (art.id === Number(req.params.id)) {
      console.log('indexof', dbBlog.indexOf(art))
      index = dbBlog.indexOf(art)
    }
  })

  console.log('index', index)

  dbBlog.slice(dbBlog.splice(index, 1))


  let data = JSON.stringify({
    blog: dbBlog
  }, null, 4);

  fs.writeFile("./public/db.json", data, (err) => {
    if (err) console.log(err);
    console.log("Fichier Json Créé");
  });


  res.render("admin", {
    dbBlog,
  });
};
// =============================/