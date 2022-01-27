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
const mysql = require('mysql');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const moment = require('moment'); // date 
const port = process.env.PORT || 3001;
const {
  engine
} = require("express-handlebars");

const date = moment().format ('MMMM Do YYYY, h:mm:ss a');
console.log('moemnt', date)

// Method-Override
app.use(methodOverride('_method'));

// Mysql
db = mysql.createConnection({
  host: 'localhost',
  user: 'lucas',
  password: 'rfn2K22$',
  database: 'site_db'
});

db.connect((err) => {
  if (err) console.error('error connecting: ' + err.stack);
  console.log('connected as id ' + db.threadId);
});

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
  console.log("le serveur tourne sur le port: ⚡" + port);
});