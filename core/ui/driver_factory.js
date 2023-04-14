const config = require('../../configurationFile.json');
const firefox = require('../ui/drivers/firefox');
const chrome = require('../ui/drivers/chrome');
const logger = require('../../core/utils/logger_manager');

class DriverFactory {
  static createDriver() {
    if (config.browser === 'chrome') {
      logger.info('Open Driver for Chrome');
      return chrome(config.capabilities);
    } else if (config.browser === 'firefox') {
      logger.info('Open Driver for Firefox');
      return firefox(config.capabilities);
    } else {
      logger.info('Any Browser is Open');
    }
  }
}

module.exports = DriverFactory;
