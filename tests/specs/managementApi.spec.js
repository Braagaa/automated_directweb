require("dotenv").config();
const Jabber = require("jabber");
const { expect } = require("chai");
const ManagementAPI = require("../pageobjects/ManagementAPI");

const URL = process.env.TEST_URL;

const jabber = new Jabber();
const management = new ManagementAPI();
const users = Array(3)
  .fill()
  .map((_) => jabber.createEmail());

describe("DELETE /users/:user_id", () => {
  before(async () => {
    await management.addVirtualAuthenticator();
    await management.open(URL);
    for (const username of users) {
      await management.register(username);
    }
  });

  it("Should delete user", async () => {
    for (const username of users) {
      await management.deleteUser(username);
    }

    expect(management.users).to.be.empty;
  });
});

after(async () => {
  await management.close();
});
