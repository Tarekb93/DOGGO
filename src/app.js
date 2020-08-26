const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../database/connection");
const model = require("./model");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const controllers = require("./controllers");

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "hbs");

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    defaultLayout: "main",
    partialsDir: path.join(__dirname, "views", "partials"),
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "..", "public")));

app.use(controllers);

module.exports = app;
