const express = require("express");
const router = express.Router();

const home = require("./home");
const auth = require("./auth");
const register = require("./registerR");
const resultsBy = require("./doggoDaily");
const { authC, requireLogin, notLogin } = require("../middlewares");
router.use(authC);

router.get("/", home.get);

router.get("/registerR", notLogin, register);

router.get("/doggoDaily", requireLogin, resultsBy.results);

router.get("/user/:id", requireLogin, resultsBy.resultsById);

router.post("/signUp", notLogin, auth.register);

router.post("/insertDD", requireLogin, resultsBy.insertResult);

router.post("/login", notLogin, auth.login);

router.get("/logout", requireLogin, auth.logout);

module.exports = router;
