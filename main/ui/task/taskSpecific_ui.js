/**
 * POM Abstractions for Task Specific Page
 */
const { By } = require('selenium-webdriver');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const configurationManager = require('../../../core/utils/configuration_manager');
/**
 * Page Model for Task Specific Page
 */
class TaskSpecificPodio {
  userAssignedDiv = By.css('div[class*="value can-update field-assignee"]');
  userAssignedToLabel = By.css(
    'div[class="field responsible"] div[class="label"]'
  );
  deleteUserAssignedIcon = By.css(
    'span[class="token-input-delete-token img-ext delete"]'
  );
  userAssignedInput = By.css(
    'div[class*="value can-update field-assignee"] div[class="bd input-box"] input'
  );
  userAssignedSelected = By.css(
    'div[class="podio-autocompleter"] ul[class=""] li[class="item user"]'
  );
  deleteTaskInNewPageIcon = By.css(
    'div[class="icon-16 icon-16-trash-small tooltip"]'
  );

  /**
   * Close a specific task page and return to the previous page
   */
  async closeTaskPage() {
    await actions.switchToInitial();
    return (await actions.driver.getAllWindowHandles()).length;
  }

  /**
   * Update assigned user in new task Page
   * @param newUser
   */
  async updateAssignedUserInNewTaskPage(newUser) {
    await actions.clickOn(this.userAssignedDiv);
    await actions.clickOn(this.deleteUserAssignedIcon);
    await actions.setText(
      this.userAssignedInput,
      configurationManager.environment.contacts[newUser].name
    );
    const displayUsers = await conditions.untilLocated(
      this.userAssignedSelected
    );
    await actions.hoverMouse(displayUsers);
    await actions.clickOn(this.userAssignedToLabel);
  }
}

const taskSpecificPodio = new TaskSpecificPodio();
module.exports = taskSpecificPodio;
