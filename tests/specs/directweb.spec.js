const DirectWeb = require("../pageobjects/DirectWeb");
const MailSlurp = require("../pageobjects/EmailService");
const { expect } = require("chai");
const Jabber = require("jabber");

const URL = "http://localhost:3000/";
const inboxId = "b41455f3-bcbe-4357-a536-a80e7f2c6fb1";
const transientEmail = "b41455f3-bcbe-4357-a536-a80e7f2c6fb1@mailslurp.com";
const mailslurpApiKey =
  "5a4e1e81756289634eb22501f196d0b8357713c71e9d1b7ac04ec10c840163e7";

const jabber = new Jabber();
const username = jabber.createEmail();
const username1 = jabber.createEmail();
const emailService = new MailSlurp(mailslurpApiKey, inboxId, transientEmail);
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
    await directweb.acceptAlert();
  });
});

describe("Login", () => {
  it("Should successfully login", async () => {
    await directweb.login(username);
    const result = await directweb.getAlertText();
    expect(result).to.eq(`${username} successfully logged in!`);
  });

  after(async () => {
    await directweb.acceptAlert();
  });
});

describe("Push Auth", async () => {
  before(async () => {
    directweb1 = new DirectWeb();
    await directweb1.addVirtualAuthenticator();
    await directweb1.open(URL);
    await directweb1.register(username1);
    await directweb1.acceptAlert();
  });

  afterEach(async () => {
    await directweb.acceptAlert();
    await directweb1.acceptAlert();
  });

  it("Should successfully request a push authentication", async () => {
    await directweb.pushAddAuth(directweb1, username1, emailService);
    const requestResult = await directweb.getAlertText();
    const grantResult = await directweb1.getAlertText();

    expect(requestResult).to.eq("Push auth successful!");
    expect(grantResult).to.eq("Successfully authenticated!");
  });

  it("Should successfully grant a push request", async () => {
    await directweb1.pushAddAuth(directweb, username, emailService);
    const requestResult = await directweb1.getAlertText();
    const grantResult = await directweb.getAlertText();

    expect(requestResult).to.eq("Push auth successful!");
    expect(grantResult).to.eq("Successfully authenticated!");
  });
});

describe("Add Authenticator", () => {
  afterEach(async () => {
    await directweb.acceptAlert();
    await directweb1.acceptAlert();
  });

  it("Should successfully request add authenticator", async () => {
    await directweb.pushAddAuth(directweb1, username1, emailService, 1);
    const requestResult = await directweb.getAlertText();
    const grantResult = await directweb1.getAlertText();

    expect(requestResult).to.eq("Add auth successful!");
    expect(grantResult).to.eq("Successfully authenticated!");
  });

  it("Should successfully grant to add authenticator", async () => {
    await directweb1.pushAddAuth(directweb, username, emailService, 1);
    const requestResult = await directweb1.getAlertText();
    const grantResult = await directweb.getAlertText();

    expect(requestResult).to.eq("Add auth successful!");
    expect(grantResult).to.eq("Successfully authenticated!");
  });
});

after(async () => {
  await directweb.close();
  await directweb1.close();
});
