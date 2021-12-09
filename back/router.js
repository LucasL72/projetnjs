const express = require("express");
const router = express.Router();

const HomeController = require("./controllers/HomeController");
const BlogController = require ("./controllers/BlogController");
const PicsController = require("./controllers/PicsController");
// Routes
router.route("/")
    .get(HomeController.homepage);

 router.route("/blog")
 .get(BlogController.blogpage); 

 router.route("/pics")
 .get(PicsController.picspage); 
 
    module.exports = router