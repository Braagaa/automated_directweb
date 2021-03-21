module.exports = class Selectors {
  static selectors = {
    button: (text) => ({ xpath: `//button[text()="${text}"]` }),
    input: (text) => ({ xpath: `//input[@placeholder="${text}"]` }),
  };
};
