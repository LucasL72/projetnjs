/*
 * Router.js
 * ********* */

// Import de module
const express = require("express");
const router = express.Router();
const uploadArticles = require('./config/multerArticles');
const uploadPhotos = require('./config/multerPhotos');
const uploadUsers = require('./config/multerUsers');
const mdl = require("./middleware/AdminOrNot");

// Import des controllers
const HomeController = require("./controllers/HomeController"),
   BlogController = require("./controllers/BlogController"),
   PicsController = require("./controllers/PicsController"),
   ContactController = require("./controllers/ContactController"),
   AuthController = require("./controllers/AuthController"),
   AdminBlogController = require("./controllers/AdminBlogController"),
   UserController = require("./controllers/UserController"),
   AdminpicsController = require("./controllers/AdminpicsController"),
   AdminuserController = require("./controllers/AdminuserController"),
   AdmincomController = require("./controllers/AdmincomController"),
   NodemailerController = require("./controllers/NodemailerController");

// Routes
router.route("/")
   .get(HomeController.homepage)
   .post(ContactController.CreateMessage);

router.route("/blog")
   .get(BlogController.blogpage);

router.route("/blog/:title")
   .get(BlogController.idpage)
   .post(BlogController.CreateCom);


router.route("/pics")
   .get(PicsController.picspage);

router.route("/contact")
   .get(ContactController.contactpage)
   .post(ContactController.CreateMessage);

router.route("/register")
   .get(AuthController.registerpage)
   .post(uploadUsers.single('imguser'), AuthController.CreateUser);

router.route("/login")
   .post(AuthController.loginUser);

router.route("/logout")
   .get(AuthController.logout);

router.route("/lostpassword")
   .post(NodemailerController.lostpassword);

router.route("/lostpassword/:id")
   .get(NodemailerController.PageEditPassword);

router.route("/editPassword/:id")
.post(NodemailerController.editPassword);

router.route("/newsletter")
   .post(NodemailerController.newsletter);

router.route("/CGU")
   .get(HomeController.mention);

router.route('/user')
   .get(UserController.userProfile)
   .put(uploadUsers.single('imguser'), UserController.EditUser);


// Gestion Administration :
router.route("/admin")
   .get(mdl.isAdmin, AdminuserController.adminShow);

router.route("/admin/user/:id")
   .put(mdl.isAdmin, uploadUsers.single('imguser'), AdminuserController.adminEditUser)
   .delete(mdl.isAdmin, AdminuserController.adminDeleteUser);

router.route('/ban/:id')
   .put(mdl.isAdmin, AdminuserController.banUser);

router.route('/unban/:id')
   .put(mdl.isAdmin, AdminuserController.unbanUser);


router.route("/admin/blog")
   .get(mdl.isAdmin, AdminBlogController.adminBlog)
   .post(mdl.isAdmin, uploadArticles.single('imgarticle'), AdminBlogController.adminCreateBlog)
   .delete(AdminBlogController.adminDeleteAllBlog);

router.route('/admin/blog/:id')
   .put(mdl.isAdmin, uploadArticles.single('imgarticle'), AdminBlogController.adminEditBlog)
   .delete(mdl.isAdmin, AdminBlogController.adminDeleteOneBlog);

router.route('/admin/coms')
   .post(mdl.isAdmin, AdmincomController.adminCreatecom);

router.route('/admin/coms/:idcommentaire')
   .delete(mdl.isAdmin, AdmincomController.adminDeleteOnecom);


router.route("/admin/pics")
   .get(mdl.isAdmin, AdminpicsController.adminpics)
   .post(mdl.isAdmin, uploadPhotos.single('photo'), AdminpicsController.adminCreatepic);

router.route("/admin/pics/:idphotos")
   .delete(mdl.isAdmin, AdminpicsController.adminDeleteOnepic);



/////===========================================

// / Routes


//  Exports du router
module.exports = router