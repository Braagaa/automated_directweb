const express = require("express");
const {
  deleteUser,
  deleteUserByName,
} = require("../controllers/managementApi");

const router = express.Router();

router.delete("/users/:user_id", deleteUser);
router.post("/users/delete", deleteUserByName);

module.exports = router;
