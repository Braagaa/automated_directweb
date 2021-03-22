const Page = require("./page");
const MailTrap = require("./EmailService");
const Selectors = require("./selectors");

const { button, input } = Selectors.selectors;

module.exports = class DirectWeb extends Page {
  constructor() {
    super();
  }

  async register(username) {
    const inputSelector = input("Username");
    await this.waitForElement(inputSelector);
    await this.type(inputSelector, username);
    await this.click(button("Register"));
  }

  async login(username) {
    const inputSelector = input("Username");
    await this.waitForElement(inputSelector);
    await this.type(inputSelector, username);
    await this.click(button("Login"));
  }

  async pushAuth(directweb, username, emailService) {
    await this.type(input("Username"), username);
    await this.type(input("Email"), emailService.email);
    await this.click(button("Push Authentication"));

    const sessionUrl = await emailService.obtainLatestEmailLink();
    await directweb.navigateTo(sessionUrl);
    await directweb.type(input("Username"), username);
    await directweb.click(button("Authenticate"));
  }
};
