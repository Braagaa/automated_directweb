const express = require("express");

const router = express.Router();

router.use("/push", (_, res) => {
  return res.render("auth");
});

router.use("/add", (_, res) => {
  return res.render("auth");
});

router.use("/", (_, res) => {
  return res.render("home");
});

module.exports = router;
