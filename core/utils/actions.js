/**
 * WebDrivers Actions
 */

const conditions = require('./conditions');
const DriverManager = require('../ui/driver_manager');
const logger = require('../../core/utils/logger_manager');
const { Key } = require('selenium-webdriver');

/**
 * Abstracts common UI actions
 */

class Actions {
  /**
   * Gets WebDriver
   */
  static get driver() {
    return DriverManager.driver;
  }

  /**
   * Return a web element to perform other actions
   * @param locator
   */
  static async getWebElement(locator) {
    logger.debug(`Getting element by: ${locator}`);
    await conditions.untilLocated(locator);
    await conditions.untilVisible(locator);
    return await Actions.driver.findElement(locator);
  }

  static async getWebElements(locator) {
    logger.debug(`Getting elements by: ${locator}`);
    return await Actions.driver.findElements(locator);
  }

  /**
   * Executes click on an element
   * @param locator
   */
  static async clickOn(locator) {
    logger.debug(`Clicking on: ${locator.toString()}`);
    const element = await Actions.getWebElement(locator);
    await element.click();
  }

  /**
   * Adds a new value in a input
   * @param locator
   * @param value
   */
  static async setText(locator, value) {
    logger.debug(`Setting text on: ${locator.toString()}`);
    const element = await Actions.getWebElement(locator);
    await element.clear();
    await element.sendKeys(value);
  }

  /**
   * Adds a new value in a input with Return
   * @param locator
   * @param value
   */
  static async setTextReturn(locator, value) {
    logger.debug(`Setting text on: ${locator.toString()}`);
    const element = await Actions.getWebElement(locator);
    await element.clear();
    await element.sendKeys(value, Key.RETURN);
  }

  /**
   * Gets text from a locator
   * @param locator
   */
  static async getText(locator) {
    const element = await Actions.getWebElement(locator);
    return await element.getText();
  }

  /**
   * Gets Attribute value from a locator
   * @param locator
   * @param type
   */
  static async getAttributeValue(locator, type) {
    const element = await Actions.getWebElement(locator);
    return await element.getAttribute(type);
  }

  /**
   * Refresh page
   */
  static async refreshPage() {
    logger.info('Refresh page');
    await Actions.driver.navigate().refresh();
  }

  /**
   * Switch of window o tab new
   * @param goBy
   */
  static async switchToNew(goBy) {
    this.originalWindow = await Actions.driver.getWindowHandle();
    await Actions.clickOn(goBy);
    await Actions.driver.wait(
      async () => (await Actions.driver.getAllWindowHandles()).length === 2,
      5000
    );
    const windows = await Actions.driver.getAllWindowHandles();
    windows.forEach(async (handle) => {
      if (handle !== this.originalWindow) {
        await Actions.driver.switchTo().window(handle);
      }
    });
  }

  /**
   * Switch of window o tab initial
   */
  static async switchToInitial() {
    await Actions.driver.close();
    await Actions.driver.switchTo().window(this.originalWindow);
  }

  /**
   * Fill in field with Enter key
   * @param locator
   * @param newData
   */
  static async fillFieldPlusEnter(locator, newData) {
    const element = await Actions.getWebElement(locator);
    await element.sendKeys(Key.CONTROL + 'a', Key.DELETE);
    await element.sendKeys(newData, Key.ENTER);
  }

  /**
   * Fill in field with Tab key
   * @param locator
   * @param newData
   */
  static async fillFieldPlusTab(locator, newData) {
    const element = await Actions.getWebElement(locator);
    await element.sendKeys(Key.CONTROL + 'a', Key.DELETE);
    await element.sendKeys(newData, Key.TAB);
  }

  /**
   * Hover mouse on an element
   * @param element
   */
  static async hoverMouse(element) {
    await Actions.driver
      .actions()
      .move({ duration: 1000, origin: element })
      .click()
      .perform();
  }
}

module.exports = Actions;
