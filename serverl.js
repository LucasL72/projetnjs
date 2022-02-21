/*
 * Server.js
 * Point d'entrée de l'application (Main / Root)
 * ********************************************* */

console.log("Mon projet en node js");
//  config .env
require("dotenv").config();

// Import de module
const express = require("express"),
  session = require("express-session"),
  MySQLStore = require("express-mysql-session")(session),
  app = express(),
  mysql = require('mysql'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  moment = require('moment'), // date 
  port = process.env.PORT || 3001,
  {
    engine
  } = require("express-handlebars");


// Date
const {
  formatDate,
  formatDateCom
} = require('./back/helper')

// Method-Override
app.use(methodOverride('_method'));

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
}

// Mysql
db = mysql.createConnection(options)

db.connect((err) => {
  if (err) console.error('error connecting: ' + err.stack);
  console.log('connected as id ' + db.threadId);
});



const sessionStore = new MySQLStore(options)

// Express MYSQL session
app.use(
  session({
    secret: "securite",
    name: "cookie_GDC",
    saveUninitialized: true,
    resave: false,
    store: sessionStore
  })
);

app.use('*', (req, res, next) => {
  res.locals.user = req.session.user;
  res.locals.isAdmin = req.session.isAdmin;
  next()
})

// gestion des "" pour MySQL
db.config.queryFormat = function (query, values) {
  if (!values) return query;
  return query.replace(/\:(\w+)/g, function (txt, key) {
    if (values.hasOwnProperty(key)) {
      return this.escape(values[key]);
    }
    return txt;
  }.bind(this));
};

// Fonction async
const util = require("util");
db.query = util.promisify(db.query).bind(db);

// main en page par default
app.set("view engine", "hbs");
app.engine("hbs", engine({
  helpers: {
    formatDate,
    formatDateCom,
  },
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

// test json
/*const ROUTER_API = require('./back/router-api')
app.use('/api/v1', ROUTER_API)*/

// Lancement de l'application
app.listen(port, () => {
  console.log("le serveur tourne sur le port: ⚡" + port);
});
// Met toute les autres page non défini en 404
app.use('*', function (req, res) {
  res.status(404).render("err", {
    title: `${process.env.ETP} - Error 404`,
    layout: 'err'
  });
});