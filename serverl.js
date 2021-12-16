/*
 * Server.js
 * Point d'entrée de l'application (Main / Root)
 * ********************************************* */

console.log("Mon projet en node js");
//  config .env
require("dotenv").config();

// Import de module
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const port = process.env.PORT || 3001;
const {
  engine
} = require("express-handlebars");

// Method-Override
app.use(methodOverride('_method'));

// main en page par default
app.set("view engine", "hbs");
app.engine("hbs", engine({
  extname: "hbs",
  defaultLayout: "main",
}));
// on ajoute le css 
app.use("/assets", express.static('public'));

// Body Parser qui nous permet de parser des data d'une req a une autre
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));


// import et utilisation du Router
const ROUTER = require('./back/router')
app.use('/', ROUTER);

// Lancement de l'application
app.listen(port, () => {
  console.log("le serveur tourne sur le port: " + port);
});