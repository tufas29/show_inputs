const ac = require("@antiadmin/anticaptchaofficial");

async function solvehCaptcha(url) {
  return new Promise((resolve, reject) => {
    ac.setAPIKey("YOUR KEY");

    const enterprisePayload = null;
    const isInvisible = false;
    const isEnterprise = true;

    ac.setSoftId(0);

    ac.solveHCaptchaProxyless(
      url,
      "ae73173b-7003-44e0-bc87-654d0dab8b75", // yad2 site key
      "",
      enterprisePayload,
      isInvisible,
      isEnterprise
    )
      .then((gresponse) => {
        resolve(gresponse);
      })
      .catch((error) => {
        console.log("test received error " + error);
        reject(error);
      });
  });
}

module.exports = solvehCaptcha;
