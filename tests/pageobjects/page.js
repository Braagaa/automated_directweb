const webdriver = require("selenium-webdriver");
const { Command } = require("selenium-webdriver/lib/command");
require("chromedriver");

const { until } = webdriver;

module.exports = class Page {
  static commands = {
    ADDVIRTUALAUTHENTICATOR: "AddVirtualAuthenticator",
    SETUSERVERIFIED: "SetUserVerified",
  };

  constructor(browser = "chrome") {
    this.driver = new webdriver.Builder().forBrowser(browser).build();
    this.authenticatorId = null;
  }

  async addVirtualAuthenticator() {
    const sessionId = (await this.driver.getSession()).id_;

    this.driver
      .getExecutor()
      .defineCommand(
        Page.commands.ADDVIRTUALAUTHENTICATOR,
        "POST",
        "/session/:sessionId/webauthn/authenticator"
      );

    const addVirtualAuthCommand = new Command(
      Page.commands.ADDVIRTUALAUTHENTICATOR
    );
    addVirtualAuthCommand.setParameter("sessionId", sessionId);
    addVirtualAuthCommand.setParameter("protocol", "ctap2");
    addVirtualAuthCommand.setParameter("transport", "internal");
    addVirtualAuthCommand.setParameter("hasResidentKey", true);
    addVirtualAuthCommand.setParameter("isUserConsenting", true);
    addVirtualAuthCommand.setParameter("isUserVerified", true);
    addVirtualAuthCommand.setParameter("hasUserVerification", true);

    const authenticatorId = await this.driver
      .getExecutor()
      .execute(addVirtualAuthCommand);

    this.authenticatorId = authenticatorId;

    return this.driver;
  }

  async open(url) {
    await this.driver.get(url);
  }

  async navigateTo(url) {
    await this.driver.get(url);
    await this.wait();
  }

  async close() {
    await this.driver.close();
  }

  async waitForElement(selector) {
    await this.driver.wait(until.elementsLocated(selector));
  }

  async getAlertText() {
    await this.driver.wait(until.alertIsPresent());
    const windowHandle = await this.driver.getWindowHandle();
    const alert = await this.driver.switchTo().alert();
    const alertText = await alert.getText();
    await this.driver.switchTo().window(windowHandle);
    return alertText;
  }

  async acceptAlert() {
    await this.driver.wait(until.alertIsPresent());
    const windowHandle = await this.driver.getWindowHandle();
    const alert = await this.driver.switchTo().alert();
    await this.wait();
    const alertText = await alert.accept();
    await this.driver.switchTo().window(windowHandle);
    return alertText;
  }

  async click(selector) {
    await this.driver.findElement(selector).then((elm) => elm.click());
  }

  async type(selector, text) {
    await this.driver.findElement(selector).then((elm) => elm.sendKeys(text));
  }

  async wait(time = 2000) {
    await this.driver.sleep(time);
  }
};
