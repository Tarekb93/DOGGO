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
    return res.redirect("/user/" + res.locals.id);
  });
};

exports.resultsById = (req, res) => {
  const routeId = req.params.id;
  console.log(req.params, "param", req.params.id);
  // console.log(req.locals, "local", req.locals.id);
  if (+routeId !== res.locals.id) {
    return res.redirect("/user/" + res.locals.id);
  }
  console.log(res.locals, "local", res.locals.id);
  const user = res.locals.user;
  model.fetchDoggoDaily(routeId).then((result) => {
    model.getUser(user).then((resultt) => {
      console.log(resultt, "resultt");

      res.render("doggoDaily", {
        doggos: result,
        id: routeId,
        dogname: resultt.dogname,
        title: "Hello " + user,
      });
      console.log(result);
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
