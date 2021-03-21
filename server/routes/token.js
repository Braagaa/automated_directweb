const express = require("express");
const cors = require("cors");
const PetersTokens = require("../services/tokens");

const router = express.Router();

const error400 = (res, message) => res.status(400).json({ error: message });
const validTypes = ["register", "login"];

router.post("/", cors(), async (req, res) => {
  const {
    body: { username, type },
  } = req;

  if (!validTypes.includes(type)) {
    return res.status(422).json({ message: "Invalid type response" });
  }

  try {
    const secret = await PetersTokens.callSecret();
    if (secret.isError) {
      return error400(res, secret.message);
    }

    const tokenData = await PetersTokens.getToken(type, username);
    if (tokenData.isError) {
      return error400(res, tokenData.result);
    }

    return res.status(200).json({ token: tokenData.result });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
