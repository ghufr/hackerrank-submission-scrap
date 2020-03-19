const { Builder } = require("selenium-webdriver");

(async () => {
  const driver = await new Builder().forBrowser("firefox").build();
  try {
    // Do something
  } catch (err) {
    console.err(err);
    await driver.quit();
  }
})();
