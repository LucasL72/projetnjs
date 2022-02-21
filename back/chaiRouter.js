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
const HomeController = require("./controllersv2/HomeController"),
   BlogController = require("./controllersv2/BlogController"),
   PicsController = require("./controllersv2/PicsController"),
   ContactController = require("./controllersv2/ContactController"),
   AuthController = require("./controllersv2/AuthController"),
   AdminBlogController = require("./controllersv2/AdminBlogController"),
   UserController = require("./controllersv2/UserController"),
   AdminpicsController = require("./controllersv2/AdminpicsController"),
   AdminuserController = require("./controllersv2/AdminuserController"),
   AdmincomController = require("./controllersv2/AdmincomController"),
   NodemailerController = require("./controllersv2/NodemailerController");

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


router.route('/admin/coms/:idcommentaire')
   .delete(mdl.isAdmin, AdmincomController.adminDeleteOnecom);


router.route("/admin/pics")
   .get(mdl.isAdmin, AdminpicsController.adminpics)
   .post(mdl.isAdmin, uploadPhotos.single('photo'), AdminpicsController.adminCreatepic);

router.route("/admin/pics/:idphotos")
   .delete(mdl.isAdmin, AdminpicsController.adminDeleteOnepic);

router.route("/messages")
   .get(mdl.isAdmin, AdmincomController.MyMessages);

router.route("/messages/:id")
   .post(mdl.isAdmin,NodemailerController.SendMessage)
   .delete(mdl.isAdmin,AdmincomController.MessDelete);

/////===========================================

// / Routes


//  Exports du router
module.exports = router
   