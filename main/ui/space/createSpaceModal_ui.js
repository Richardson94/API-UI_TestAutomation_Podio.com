/**
 * POM Abstractions for CreateSpaceModal
 */
const { By } = require('selenium-webdriver');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const config = require('../../../core/utils/configuration_manager');
/**
 * Page Model for CreateSpaceModal
 */
class CreateSpaceModalPodio {
  createComponentInput = By.css("input[id='workspace-name']");
  createComponentButton = By.css('button[class="button-new primary"]');
  modalCloseButton = By.css('div[data-modal-action="abort"]');
  validationNameCreateInput = By.css(
    'input[class="validated-input-component is-invalid tooltip"]'
  );

  /**
   * verify new workspaceCreated
   */
  async createWorkspace(nameWorkspace) {
    this.nameWP = nameWorkspace.toLowerCase();
    await actions.getWebElement(this.createComponentInput);
    await actions.setText(this.createComponentInput, nameWorkspace);
    const elementCreated = await actions.clickOn(this.createComponentButton);
    await conditions.untilLocated(this.modalCloseButton);
    if (config.setUp.browser === 'chrome') {
      await actions.clickOn(this.modalCloseButton);
      await actions.clickOn(this.modalCloseButton);
    } else {
      await actions.clickOn(this.modalCloseButton);
    }
    return typeof elementCreated !== 'object';
  }

  /**
   * verify new workspaceCreated with WorkspaceName in BLank
   */
  async createWorkspaceBlank() {
    await conditions.untilLocated(this.createComponentInput);
    await actions.setTextReturn(this.createComponentInput, '');
    await conditions.untilLocated(this.validationNameCreateInput);
    return actions.getAttributeValue(this.validationNameCreateInput, 'title');
  }
}

const createSpaceModalPodio = new CreateSpaceModalPodio();
module.exports = createSpaceModalPodio;
