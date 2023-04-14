const { Browser, Builder } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');

async function chrome(capabilities) {
  //Options
  const options = new Options();

  if (capabilities.headless) options.headless();
  if (!capabilities.maximizeWindow) options.windowSize(capabilities.windowSize);

  options.excludeSwitches('enable-automation');
  options.setUserPreferences({
    "credentials_enable_service": false,
    "profile.password_manager_enabled": false
  })

  //Driver
  return await new Builder()
    .forBrowser(Browser.CHROME)
    .setChromeOptions(options)
    .build();
}

module.exports = chrome;
