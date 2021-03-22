const express = require("express");

const router = express.Router();

router.get("/push", (_, res) => {
  return res.render("auth");
});

router.get("/add", (_, res) => {
  return res.render("auth");
});

router.get("/", (_, res) => {
  return res.render("home");
});

module.exports = router;
