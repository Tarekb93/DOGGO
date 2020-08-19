const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const db = require("../database/connection");
const model = require("./model");
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
  model.createUser(req.body).then((resultt) => {
    // console.log(resultt.rows[0].id);
    res.redirect("/user/" + resultt.rows[0].id);
    //   res.render("doggoProfile");
  });
  console.log(req.body);
});

app.get("/doggoDaily", (req, res) => {
  model.fetchDoggoDaily().then((result) => {
    res.render("doggoDaily", {
      doggos: result,
    });
  });
});

app.get("/user/:id", (req, res) => {
  const id = req.params.id;
  model.fetchDoggoDaily(id).then((result) => {
    res.render("doggoDaily", {
      doggos: result,
      id: id,
    });
  });
});

app.post("/insertDD", (req, res) => {
  model
    .insertDoggoDaily(req.body)
    // .then((result) => res.render("doggoDaily"))
    .then(() => res.redirect("/user/" + req.body.user_id));
  //   console.log(req.body);
});

app.post("/login", (req, res) => {
  model.login(req.body).then((user) => {
    console.log(user,"t");
    res.redirect("/user/" + user.id);
  });
  console.log(req.body);
});

module.exports = app;
