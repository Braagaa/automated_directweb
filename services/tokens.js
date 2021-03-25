const fetch = require("node-fetch");

const baseURL = "https://tokendemo.pd-dev.awstest.loginid.io";

class PetersTokens {
  static async callSecret() {
    const privateKey = process.env.PKEY.replace(/\\n/g, "\n");
    /*
const privateKey = `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEINlcCm07+PkJfxpvp0ikknlx9SCJ3ElZwqH4yGRQJ1etoAoGCCqGSM49
AwEHoUQDQgAEBnmhlFab44f6n7RtqKMDd5vcMzjfLFhaxDZ6mU0cigA3jQpwcRBo
z3ngrF518WY+6J9DWiiCn4KG0PbYh0Abng==
-----END EC PRIVATE KEY-----`;
*/
    const clientId = process.env.API_KEY;

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
    const clientId = process.env.API_KEY;
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
