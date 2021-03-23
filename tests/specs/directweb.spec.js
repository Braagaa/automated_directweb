require("dotenv").config();
const DirectWeb = require("../pageobjects/DirectWeb");
const MailSlurp = require("../pageobjects/EmailService");
const { expect } = require("chai");
const Jabber = require("jabber");

const URL = process.env.TEST_URL;
const inboxId = process.env.MAILSLURP_INBOX;
const transientEmail = process.env.MAILSLURP_EMAIL;
const mailslurpApiKey = process.env.MAILSLURP_API_KEY;

const jabber = new Jabber();
const username = jabber.createEmail();
const username1 = jabber.createEmail();
const emailService = new MailSlurp(mailslurpApiKey, inboxId, transientEmail);
let directweb;
let directweb1;

describe("Baisc Validation", () => {
  before(async () => {
    directweb = new DirectWeb();
    await directweb.addVirtualAuthenticator();
    await directweb.open(URL);
  });

  afterEach(async () => {
    await directweb.acceptAlert();
  });

  it("Should not register an empty username", async () => {
    await directweb.register("");
    const result = await directweb.getAlertText();
    expect(result).to.eq("Username Empty");
  });

  it("Should not authenticate a non-email username", async () => {
    await directweb.register(jabber.createFullName());
    const result = await directweb.getAlertText();
    expect(result).to.eq("Username Invalid");
  });

  it("Should not login a non-registered username", async () => {
    await directweb.login(username);
    const result = await directweb.getAlertText();
    expect(result).to.eq("User not found");
  });

  after(async () => {
    await directweb.close();
  });
});

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

describe("Cross Validations", async () => {
  before(async () => {
    directweb1 = new DirectWeb();
    await directweb1.addVirtualAuthenticator();
    await directweb1.open(URL);
    await directweb1.register(username1);
    await directweb1.acceptAlert();
  });

  it("Authenticator A should not be able to login with username of Authenticator B", async () => {
    await directweb.login(username1);
    const result = await directweb.getAlertText();
    expect(result).to.eq("Your Identity could not be verified");
  });

  it("Authenticator B should not be able to login with username of Authenticator A", async () => {
    await directweb1.login(username);
    const result = await directweb1.getAlertText();
    expect(result).to.eq("Your Identity could not be verified");
  });

  after(async () => {
    await directweb.acceptAlert();
    await directweb1.acceptAlert();
  });
});

describe("Push Auth", async () => {
  afterEach(async () => {
    await directweb.acceptAlert();
    await directweb1.acceptAlert();
  });

  it("Should successfully request for push authentication", async () => {
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
