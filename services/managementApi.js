const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const uuid = require("uuid");

const deleteUserByName = async (username) => {
  const managementApiServiceURL = process.env.MANAGEMENT_API_SERVICE_URL;
  const apiKey = process.env.MANAGEMENT_API_KEY;
  const pkey = process.env.MANAGEMENT_PKEY.replace(/\\n/g, "\n");

  const payload = {
    type: "users.delete",
    nonce: uuid.v4(),
    iat: parseInt(Date.now() / 1000),
  };

  try {
    const token = jwt.sign(payload, pkey, { algorithm: "ES256" });
    const res = await fetch(`${managementApiServiceURL}/manage/users/delete`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${token}`,
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({ username }),
    });

    return res;
  } catch (e) {
    console.error(error);
    throw error;
  }
};

const deleteUser = async (userId) => {
  const managementApiServiceURL = process.env.MANAGEMENT_API_SERVICE_URL;
  const apiKey = process.env.MANAGEMENT_API_KEY;
  const pkey = process.env.MANAGEMENT_PKEY.replace(/\\n/g, "\n");

  const payload = {
    type: "users.delete",
    nonce: uuid.v4(),
    iat: parseInt(Date.now() / 1000),
  };

  try {
    const token = jwt.sign(payload, pkey, { algorithm: "ES256" });
    const res = await fetch(
      `${managementApiServiceURL}/manage/users/${userId}`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          authorization: `Bearer ${token}`,
          "X-API-Key": apiKey,
        },
      }
    );

    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { deleteUser, deleteUserByName };
