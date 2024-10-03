const puppeteer = require("puppeteer");
const solvehCaptcha = require("./solver.js");
const url =
  "https://www.yad2.co.il/my-alerts/realestate/66e34186bb50e18879901b70?utm_source=myAlertsRealestate&utm_medium=email&utm_campaign=myAlertsFeed";

async function openWebsite() {
  try {
    const browser = await puppeteer.launch({
      headless: false,
    });

    const page = await browser.newPage();

    await page.setViewport({ width: 1280, height: 720 });

    await page.goto(url);

    await new Promise((r) => setTimeout(r, 3000));

    if (page.url().includes("validate")) {
      const token = await solvehCaptcha(page.url());

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

      await page.type('textarea[name="h-captcha-response"]', token);

      await page.type(
        "#cf_input",
        "V015186870c621UTGzpTW741121372ICmlEUmO3c4343317277178426953458680f06"
      );

      await new Promise((r) => setTimeout(r, 1000));

      const buttonSelector = ".btn.btn-success.btn-sm";
      await page.waitForSelector(buttonSelector);
      await page.click(buttonSelector);
    }

    // await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
}
openWebsite();
