const express = require("express");
const router = express.Router();

const HomeController = require("./controllers/HomeController");

// Routes
router.route("/")
    .get(HomeController.homepage);

    module.exports = router