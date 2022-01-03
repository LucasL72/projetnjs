/*
 * Router.js
 * ********* */

// Import de module
const express = require("express");
const router = express.Router();
const upload = require('./config/multer')

// Import des controllers
const HomeController = require("./controllers/HomeController");
const BlogController = require("./controllers/BlogController");
const PicsController = require("./controllers/PicsController");
const ContactController = require("./controllers/ContactController");
const RegisterController = require("./controllers/RegisterController");
const AdminController = require("./controllers/AdminController");



// Routes
router.route("/")
   .get(HomeController.homepage)
   .post(HomeController.CreateMessage);

router.route("/blog")
   .get(BlogController.blogpage);

router.route("/blog:id")
   .get(BlogController.idpage)
   .post(BlogController.CreateCom)
   .put(BlogController.EditCom);

router.route("/pics")
   .get(PicsController.picspage);

router.route("/contact")
   .get(ContactController.contactpage)
   .post(ContactController.CreateMessage);

router.route("/register")
   .get(RegisterController.registerpage)
   //.post(RegisterController.CreateUser)
   .post(upload.array('ImgMulter',3), RegisterController.MulterImg);

router.route("/login")
   .post(RegisterController.loginUser);

router.route("/lostpassword")
   .post(RegisterController.lostpassword);

router.route("/newsletter")
   .post(RegisterController.newsletter);


router.route("/admin")
   .get(AdminController.adminpage)
   .post(upload.array('ImgMulter',3), RegisterController.MulterImg)
   //.put(AdminController.adminEdit)
   //.delete(AdminController.adminDelete)*/

   // Test DB 
   //.post(AdminController.createArticle)
   .put(AdminController.editArticle)
   .delete(AdminController.deleteArticle);
// /================


// / Routes


//  Exports du router
module.exports = router