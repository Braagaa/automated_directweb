const DirectWeb = require("../pageobjects/DirectWeb");
const { expect } = require("chai");
const Jabber = require("jabber");

const URL = "http://localhost:3000/";
const EMAIL_SERVICE = "https://mailtrap.io/signin";
const jabber = new Jabber();
const username = jabber.createEmail();
const username1 = jabber.createEmail();
let directweb;
let directweb1;

describe("Validation", () => {});

describe("Register", () => {
  before(async () => {
    directweb = new DirectWeb();
    await directweb.addVirtualAuthenticator();
    await directweb.open(URL);
  });

  it("Should successfully register a user", async () => {
    await directweb.register(username);
    const result = await directweb.getAlertText();
    expect(result).to.eq(`${username} successfully registered!`);
  });

  after(async () => {
    await directweb.wait();
    await directweb.acceptAlert();
  });
});

describe("Login", () => {
  it("Should successfully login", async () => {
    await directweb.login(username);
    const result = await directweb.getAlertText();
    console.log(result);
    expect(result).to.eq(`${username} successfully logged in!`);
  });

  after(async () => {
    await directweb.wait();
    await directweb.acceptAlert();
  });
});

describe("Push Auth", async () => {
  before(async () => {
    directweb1 = new DirectWeb();
    await directweb1.addVirtualAuthenticator();
    await directweb1.open(URL);
    await directweb1.register(username1);
    await directweb1.wait();
    await directweb1.acceptAlert();
  });
  it("Should successfully request push authentication", async () => {
    await directweb.pushAuth(directweb1, username1, EMAIL_SERVICE);
  });
});
