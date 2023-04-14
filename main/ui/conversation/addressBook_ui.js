/**
 * POM Abstractions for the component dropdown "Actions" in conversation page
 */
const { By } = require('selenium-webdriver');
const configurationManager = require('../../../core/utils/configuration_manager');
/**
 * Page Model for Actions Dropdown
 */
class AddressBookPodio {
  contactDoneButton = By.className('button-new done align-right primary');
  contactOneID =
    "//*[@data-key='" +
    configurationManager.environment.contacts.contactOne.userID +
    "']";
  contactTwoID =
    "//*[@data-key='" +
    configurationManager.environment.contacts.contactTwo.userID +
    "']";
}

const addressBookPodio = new AddressBookPodio();
module.exports = addressBookPodio;
