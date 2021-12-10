/*
 * Router.js
 * ********* */

// Import de module
const express = require("express");
const router = express.Router();

// Import des controllers
const HomeController = require("./controllers/HomeController");
const BlogController = require("./controllers/BlogController");
const PicsController = require("./controllers/PicsController");
const ContactController = require("./controllers/ContactController");
const RegisterController = require("./controllers/RegisterController");
const AdminController = require("./controllers/AdminController");



// Routes
router.route("/")
   .get(HomeController.homepage);

router.route("/blog")
   .get(BlogController.blogpage);

router.route("/blog:id")
   .get(BlogController.idpage);

router.route("/pics")
   .get(PicsController.picspage);

router.route("/contact")
   .get(ContactController.contactpage);

router.route("/register")
   .get(RegisterController.registerpage);

router.route("/admin")
   .get(AdminController.adminpage);


// / Routes


//  Exports du router
module.exports = router