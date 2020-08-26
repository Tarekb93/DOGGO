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

exports.results = (req, res) => {
  model.fetchDoggoDaily().then((result) => {
    res.render("doggoDaily", {
      doggos: result,
    });
  });
};

exports.resultsById = (req, res) => {
  const routeId = req.params.id;
  if (+routeId !== res.locals.id) {
    return res.redirect("/user/" + res.locals.id);
  }
  const user = res.locals.user;
  model.fetchDoggoDaily(routeId).then((result) => {
    res.render("doggoDaily", {
      doggos: result,
      id: routeId,
      title: user,
    });
  });
};

exports.insertResult = (req, res) => {
  model
    .insertDoggoDaily(req.body)
    // .then((result) => res.render("doggoDaily"))
    .then(() => res.redirect("/user/" + req.body.user_id));
  //   console.log(req.body);
};
