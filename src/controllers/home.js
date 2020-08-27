exports.get = (req, res) => {
  console.log("tarek", res.tarek);
  console.log(2, res.locals.authenticated);
  res.render("home", {
    title: "DOGGO",
    signedIn: res.locals.authenticated,
    username: res.locals.user,
    homee: true,
  });
};
