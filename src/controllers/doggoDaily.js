const model = require("../model");
const { response } = require("express");

// exports.get = (req, res) => {
//   res.render("home", {
//     title: "DOGGO",
//     signedIn: false,
//     username: res.locals.user,
//     activePage: { doggoDaily: true },
//   });
// };

exports.results = async (req, res) => {
  try {
    const doggos = await model.fetchDoggoDaily();
    return res.redirect("/user/" + res.locals.id);
  } catch (err) {
    return res.redirect("/login");
  }
};

exports.resultsById = async (req, res) => {
  const routeId = req.params.id;
  const user = res.locals.user;
  try {
    if (+routeId !== res.locals.id) {
      return res.redirect("/user/" + res.locals.id);
    }
    const result = await model.fetchDoggoDaily(routeId);
    const resultt = await model.getUser(user);

    res.render("doggoDaily", {
      doggos: result,
      id: routeId,
      dogname: resultt.dogname,
      title: "Hello " + user,
      doggoDa: true,
    });
  } catch (err) {
    res.render("error", { error: err.message });
  }
};

exports.insertResult = async (req, res) => {
  try {
    const insert = await model.insertDoggoDaily(req.body);
    res.redirect("/user/" + req.body.user_id);
  } catch (err) {
    res.render("error", { error: err.message });
  }
};
