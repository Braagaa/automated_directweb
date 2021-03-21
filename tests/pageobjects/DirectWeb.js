const Page = require("./page");
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

  async pushAuth(directweb, username, transientEmail, emailService) {
    await this.type(input("Username"), username);
    await this.type(input("Email"), transientEmail);
    await this.click(button("Push Authentication"));
    await directweb.open(emailService);
  }
};
