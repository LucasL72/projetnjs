/*
 * Router.js
 * ********* */

// Import de module
const express = require("express");
const router = express.Router();
const upload = require('./config/multer')

// Import des controllers
const HomeController = require("./controllers/HomeController"),
   BlogController = require("./controllers/BlogController"),
   PicsController = require("./controllers/PicsController"),
   ContactController = require("./controllers/ContactController"),
   RegisterController = require("./controllers/RegisterController"),
   AdminController = require("./controllers/AdminControllerBlog"),
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

router.route("/blog:id")
   .get(BlogController.idpage)
   .post(BlogController.CreateCom);

router.route("/pics")
   .get(PicsController.picspage);

router.route("/contact")
   .get(ContactController.contactpage)
   .post(ContactController.CreateMessage);

router.route("/register")
   .get(RegisterController.registerpage)
   .post(upload.single('imguser'), RegisterController.CreateUser);

router.route("/login")
   .post(RegisterController.loginUser);

router.route("/lostpassword")
   .post(RegisterController.lostpassword);

router.route("/newsletter")
   .post(RegisterController.newsletter);


// Gestion Administration :
router.route("/admin")
   .get(AdminuserController.adminShow);

router.route("/admin/user/:id")
   .put(upload.single('imguser'), AdminuserController.adminEditUser)
   .delete(AdminuserController.adminDeleteUser);

router.route("/admin/blog")
   .get(AdminController.adminBlog)
   .post(upload.single('imgarticle'), AdminController.adminCreateBlog)
   .delete(AdminController.adminDeleteAllBlog);

router.route('/admin/blog/:id')
   .put(upload.single('imgarticle'), AdminController.adminEditBlog)
   .delete(AdminController.adminDeleteOneBlog);

router.route('/admin/coms')
   .post(AdmincomController.adminCreatecom);

router.route('/admin/coms/:id')
   .delete(AdmincomController.adminDeleteOnecom);

router.route("/admin/pics")
   .get(AdminpicsController.adminpics)
   .post(upload.single('photo'), AdminpicsController.adminCreatepic);

router.route("/admin/pics/:idphotos")
   .delete(AdminpicsController.adminDeleteOnepic);



/////===========================================

router.route('/user')
   .get(UserController.userProfile)
   .post(upload.single('imguser'), UserController.EditUser);

// / Routes


//  Exports du router
module.exports = router