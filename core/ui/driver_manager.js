const DriverFactory = require('./driver_factory');
const logger = require('../../core/utils/logger_manager');

class DriverManager {
  static driver;
  static sessionExists = false;

  static async init() {
    if (!this.sessionExists) {
      logger.info('Creating a new session');
      this.driver = await DriverFactory.createDriver();
      this.sessionExists = true;
    } else {
      logger.warn('A session already exist');
    }
    logger.info(
      'Session ID:',
      (await DriverManager.driver.getSession()).getId()
    );
  }
  static async cleanNameCookie(nameCookie) {
    await this.driver
      .manage()
      .deleteCookie(nameCookie)
      .then((cookie) => {
        logger.info(cookie, nameCookie + 'Cookie has been deleted...');
      });
  }

  static async quit() {
    logger.info('Quitting session');
    await DriverManager.driver?.quit();
    this.sessionExists = false;
  }
}

module.exports = DriverManager;
