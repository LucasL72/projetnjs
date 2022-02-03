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
   RegisterController = require("./controllers/RegisterController"),
   AdminBlogController = require("./controllers/AdminBlogController"),
   UserController = require("./controllers/UserController"),
   AdminpicsController = require("./controllers/AdminpicsController"),
   AdminuserController = require("./controllers/AdminuserController"),
   AdmincomController = require("./controllers/AdmincomController");
// Routes
router.route("/")
   .get(HomeController.homepage)
   .post(HomeController.CreateMessage);

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
   .get(RegisterController.registerpage)
   .post(uploadUsers.single('imguser'), RegisterController.CreateUser);

router.route("/login")
   .post(RegisterController.loginUser);

router.route("/logout")
   .get(RegisterController.logout);

router.route("/lostpassword")
   .post(RegisterController.lostpassword);

router.route("/newsletter")
   .post(RegisterController.newsletter);


// Gestion Administration :
router.route("/admin")
   .get(mdl.isAdmin, AdminuserController.adminShow);

router.route("/admin/user/:id")
   .put(mdl.isAdmin, uploadUsers.single('imguser'), AdminuserController.adminEditUser)
   .delete(mdl.isAdmin,AdminuserController.adminDeleteUser);

router.route('/ban/:id')
   .put(mdl.isAdmin,AdminuserController.banUser);

/*router.route('/unban/:id')
   .put(mdl.isAdmin, AdminuserController.unbanUser);*/


router.route("/admin/blog")
   .get(mdl.isAdmin,AdminBlogController.adminBlog)
   .post(mdl.isAdmin,uploadArticles.single('imgarticle'), AdminBlogController.adminCreateBlog)
   .delete(AdminBlogController.adminDeleteAllBlog);

router.route('/admin/blog/:id')
   .put(mdl.isAdmin,uploadArticles.single('imgarticle'), AdminBlogController.adminEditBlog)
   .delete(mdl.isAdmin,AdminBlogController.adminDeleteOneBlog);

router.route('/admin/coms')
   .post(mdl.isAdmin,AdmincomController.adminCreatecom);

router.route('/admin/coms/:idcommentaire')
   .delete(mdl.isAdmin,AdmincomController.adminDeleteOnecom);

router.route("/admin/pics")
   .get(mdl.isAdmin,AdminpicsController.adminpics)
   .post(mdl.isAdmin,uploadPhotos.single('photo'), AdminpicsController.adminCreatepic);

router.route("/admin/pics/:idphotos")
   .delete(mdl.isAdmin,AdminpicsController.adminDeleteOnepic);



/////===========================================

router.route('/user')
   .get(UserController.userProfile)
   .post(uploadUsers.single('imguser'), UserController.EditUser);

// / Routes


//  Exports du router
module.exports = router