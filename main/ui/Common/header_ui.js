/**
 * POM Abstractions for Headers
 */
const { By } = require('selenium-webdriver');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');

/**
 * Page Model for Headers
 */
class HeaderPodio {
  taskIcon = By.css('a[aria-label="Tasks"]');
  calendarIcon = By.css('a[aria-label="Calendar"]');
  conversationIcon = By.xpath("//a[@href='/conversations']");
  conversationInbox = By.xpath(
    "//li[@class='inbox tooltip']/a[@href='/conversations']"
  );
  accountIcon = By.css('.navigation-link.my-account a');

  /**
   * Open options for an account Organization into PODIO
   */
  async openOptionAccount(optionAccount) {
    await conditions.untilLocated(this.accountIcon);
    await actions.clickOn(this.accountIcon);
    await conditions.untilLocated(optionAccount);
    await actions.clickOn(optionAccount);
  }
}

const headerPodio = new HeaderPodio();
module.exports = headerPodio;
