const fetch = require("node-fetch");

const baseURL = "https://tokendemo.pd-dev.awstest.loginid.io";
const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, "\n");
const clientId = process.env.API_KEY;

class PetersTokens {
  static async callSecret() {
    const res = await fetch(`${baseURL}/secret`, {
      method: "POST",
      body: JSON.stringify({ client_id: clientId, private_key: privateKey }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const text = await res.text();
      return { isError: true, message: text };
    } else {
      return { isError: false, message: "success" };
    }
  }

  static async getToken(type, username) {
    const res = await fetch(`${baseURL}/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        username,
        type: `auth.${type}`,
      }),
    });
    const tokenData = await res.text();
    const base = { result: tokenData };

    if (!res.ok) {
      return { ...base, isError: true };
    } else {
      return { ...base, isError: false };
    }
  }
}

module.exports = PetersTokens;
