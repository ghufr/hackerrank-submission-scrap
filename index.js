require("dotenv").config();
const { Builder, By } = require("selenium-webdriver");
const baseUrl = "https://www.hackerrank.com";
// const contestName = "jurnal-online-alpro-2020";

// UNFINISHED, USE REST API INSTEAD
(async () => {
  const driver = await new Builder().forBrowser("firefox").build();
  try {
    await driver.get(`${baseUrl}/auth/login`);
    await driver
      .findElement(By.id("input-1"))
      .sendKeys(process.env.HR_USERNAME);
    await driver
      .findElement(By.id("input-2"))
      .sendKeys(process.env.HR_PASSWORD);
    await (
      await driver.findElement(
        By.xpath("//button[@data-analytics='LoginPassword']")
      )
    ).click();
  } catch (err) {
    console.log(err);
    await driver.quit();
  }
})();
