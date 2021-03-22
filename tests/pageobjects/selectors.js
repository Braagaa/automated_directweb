module.exports = class Selectors {
  static selectors = {
    button: (text) => ({ xpath: `//button[text()="${text}"]` }),
    input: (text, prop = "placeholder") => ({
      xpath: `//input[@${prop}="${text}"]`,
    }),
    id: (id) => ({ css: `#${id}` }),
  };
};
