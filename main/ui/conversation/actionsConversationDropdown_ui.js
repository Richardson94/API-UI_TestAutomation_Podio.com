/**
 * POM Abstractions for the component dropdown "Actions" in conversation page
 */
const { By } = require('selenium-webdriver');
/**
 * Page Model for Actions Dropdown
 */
class ActionsDropdownPodio {
  dropDownButton = By.className('action-dropdown align-left');
  selectedLeaveOption = By.css('.action-dropdown-wrapper .leave-conversation');
  selectedAddOption = By.css('.action-dropdown-wrapper .add-people');
}

const actionsDropdownPodio = new ActionsDropdownPodio();
module.exports = actionsDropdownPodio;
