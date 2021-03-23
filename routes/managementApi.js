const express = require("express");
const { deleteUser } = require("../controllers/managementApi");

const router = express.Router();

router.delete("/users/:user_id", deleteUser);

module.exports = router;
