const puppeteer = require("puppeteer");

const url =
  "https://www.yad2.co.il/my-alerts/realestate/66e34186bb50e18879901b70?utm_source=myAlertsRealestate&utm_medium=email&utm_campaign=myAlertsFeed";

async function openWebsite() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();

    await page.goto(url);

    await page.waitForSelector('textarea[name="h-captcha-response"]', {
      hidden: true,
    });

    await page.evaluate(() => {
      const captchaTextarea = document.querySelector(
        'textarea[name="h-captcha-response"][id^="h-captcha-response-"]'
      );

      if (captchaTextarea) {
        console.log("Found textarea with ID:", captchaTextarea.id);
        captchaTextarea.style.display = "block";
      }
    });

    await page.waitForSelector("#cf_input", { hidden: true });

    await page.evaluate(() => {
      const cfInput = document.querySelector("#cf_input");
      if (cfInput) {
        cfInput.type = "text";
        cfInput.style.display = "block";
      }
    });

    await page.type(
      'textarea[name="h-captcha-response"]',
      "Your captcha text here",
      {
        delay: 100,
      }
    );

    await page.type("#cf_input", "Your cf_input text here", {
      delay: 100,
    });

    // await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
openWebsite();
