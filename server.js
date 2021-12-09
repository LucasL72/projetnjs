console.log("Mon projet en node js");

require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { engine } = require("express-handlebars");

// main en page par default
app.set("view engine", "hbs");
app.engine("hbs", engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);
// on ajoute le css 
app.use("/assets", express.static('public'));

const ROUTER = require('./back/router')
app.use('/', ROUTER)

app.listen(port, () => {
    console.log("le serveur tourne sur le port: " + port);
  });