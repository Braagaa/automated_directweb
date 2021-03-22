const express = require("express");
const { deleteUser } = require("../controllers/managementApi");

const router = express.Router();

router.get("/users/:user_id", deleteUser);

module.exports = router;
