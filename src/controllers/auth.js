const model = require("../model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

exports.loginPage = (req, res) => {
  res.render("home", { activePage: { login: true } });
};

exports.registerPage = (req, res) => {
  res.render("registerR", { activePage: { register: true } });
};

exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await model.getUser(username);
    const equals = await bcrypt.compare(password, user.password);
    if (!equals) throw new Error("Check your username/password ");
    const token = jwt.sign({ username, id: user.id }, process.env.JWT_SECRET);
    res.cookie("access_token", token, { HttpOnly: true });
    res.redirect("/user/" + user.id);
  } catch (err) {
    res.render("home", { error: err.message });
  }
};

exports.register = async (req, res) => {
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  try {
    if (password !== confirmPassword) throw new Error("Password not match");
    const hash = await bcrypt.hash(password, saltRounds);
    const data = {
      password: hash,
      username: req.body.username,
      age: req.body.age,
      dogname: req.body.dogname,
      location: req.body.location,
    };
    const resultt = await model.createUser(data);
    console.log(resultt.rows[0].id);
    const token = jwt.sign(
      { username: req.body.username, id: resultt.rows[0].id },
      process.env.JWT_SECRET
    );
    res.cookie("access_token", token, { HttpOnly: true });
    res.redirect("/user/" + resultt.rows[0].id);
  } catch (err) {
    res.render("registerR", { error: err.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
};
