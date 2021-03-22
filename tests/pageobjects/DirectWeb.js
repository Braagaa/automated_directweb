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

  async pushAddAuth(directweb, username, emailService, pushOrAdd = 0) {
    const typeButton =
      pushOrAdd === 0
        ? button("Push Authentication")
        : button("Add Authenticator");

    await this.type(input("Username"), username);
    await this.type(input("Email"), emailService.email);
    await this.click(typeButton);

    const sessionUrl = await emailService.obtainLatestEmailLink();
    console.log(sessionUrl);
    await directweb.navigateTo(sessionUrl);
    await directweb.type(input("Username"), username);
    await directweb.click(button("Authenticate"));
  }
};
