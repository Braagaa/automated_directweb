const express = require("express");

const router = express.Router();

router.get("/push/authenticator", (_, res) => {
  return res.render("auth");
});

router.get("/add/authenticator", (_, res) => {
  return res.render("auth");
});

router.get("/", (_, res) => {
  return res.render("home");
});

module.exports = router;
