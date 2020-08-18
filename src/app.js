const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

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

app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res) => {
  res.render("home", {
    title: "DOGGO",
    username: "You",
  });
});

app.get("/doggoProfile", (req, res) => {
  res.render("doggoProfile");
});

app.post("/signUp", (req, res) => {
  res.render("doggoProfile");
  console.log(req.body);
});

module.exports = app;
