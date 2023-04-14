const { Browser, Builder } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/firefox');

async function firefox(capabilities) {
  //Options
  const options = new Options();
  if (capabilities.headless) options.headless();
  if (!capabilities.maximizeWindow) options.windowSize(capabilities.windowSize);

  //Driver
  return await new Builder()
    .forBrowser(Browser.FIREFOX)
    .setFirefoxOptions(options)
    .build();
}

module.exports = firefox;
