/**
 * WebDrivers Conditions
 */

const DriverManager = require('../ui/driver_manager');
const logger = require('../../core/utils/logger_manager');
const config = require('../../core/utils/configuration_manager');
const { until } = require('selenium-webdriver');

/**
 * Abstracts common UI conditions
 */
class Conditions {
  /**
   * Getter for active driver to perform actions
   */
  static get driver() {
    return DriverManager.driver;
  }

  /**
   * Waits until an element is in a given location
   * @param locator
   * @param timeout
   */
  static async untilLocated(locator, timeout = config.timeout) {
    logger.debug(`Waiting until element is located: ${locator.toString()}`);
    return await Conditions.driver.wait(until.elementLocated(locator), timeout);
  }

  /**
   * Waits until an element is visible
   * @param locator
   * @param timeout
   */
  static async untilVisible(locator, timeout = config.timeout) {
    logger.debug(`Waiting until element is visible: ${locator.toString()}`);
    const element = await Conditions.driver.findElement(locator);
    return await Conditions.driver.wait(
      until.elementIsVisible(element),
      timeout
    );
  }

  /**
   * Waits until an element is Not visible
   * @param locator
   * @param timeout
   */
  static async untilIsNotVisible(locator, timeout = config.timeout) {
    logger.debug(`Waiting until element is Not visible: ${locator.toString()}`);
    const element = await Conditions.driver.findElement(locator);
    return await Conditions.driver.wait(
      until.elementIsNotVisible(element),
      timeout
    );
  }

  /**
   * Waits until an url is loaded
   * @param url
   * @param timeout
   */
  static async untilUrlLoaded(url, timeout = config.timeout) {
    logger.debug(`Waiting until url is loaded: ${url.toString()}`);
    return await Conditions.driver.wait(until.urlIs(url), timeout);
  }

  /**
   * Return true if an element is visible
   * @param locator
   * @param timeout
   */
  static async isVisible(locator, timeout = config.timeout) {
    try {
      await this.untilVisible(locator, timeout);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Return true if an element is Not visible
   * @param locator
   * @param timeout
   */
  static async isNotVisible(locator, timeout = config.timeout) {
    try {
      await this.untilIsNotVisible(locator, timeout);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Waits until Page Title has an specific text
   * @param title
   * @param timeout
   */
  static async untilTitleIs(title, timeout = config.timeout) {
    logger.debug(`Waiting until the Page Title is: ${title}`);
    return await Conditions.driver.wait(until.titleIs(title), timeout);
  }
}

module.exports = Conditions;
