/**
 * POM Abstractions for DeleteSpaceModal
 */
const { By } = require('selenium-webdriver');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const space_ui = require('./space_ui');
const sideBarPodio = require('../Common/sideBar_ui');
/**
 * Page Model for DeleteSpaceModal
 */
class DeleteSpaceModalPodio {
  deleteWPButton = By.className('delete-space');
  deleteInput = By.css("input[class='equalToData required']");
  validationNameDeleteInput = By.className('form-validation-invalid-icon');
  /**
   * verify that the user can delete the Workspace
   */
  async deleteWorkspace() {
    await conditions.untilLocated(space_ui.columnGridD);
    await actions.clickOn(space_ui.superMenuButton);
    await conditions.untilLocated(this.deleteWPButton);
    await actions.clickOn(this.deleteWPButton);
    await actions.setTextReturn(this.deleteInput, 'delete this workspace');
    await sideBarPodio.verifySideMenu();
    return await conditions.isVisible(this.nameWP);
  }

  /**
   * verify that the user cannot delete the Workspace with incorrect word of confirmation
   *  for that
   */
  async negativeDelete(wordDelete) {
    let response = '';
    await this.deleteSteps(wordDelete);
    await conditions.untilLocated(this.validationNameDeleteInput);
    response = await actions.getAttributeValue(
      this.validationNameDeleteInput,
      'title'
    );
    await actions.refreshPage();
    return response;
  }

  async deleteSteps(wordDelete) {
    await conditions.untilLocated(space_ui.columnGridD);
    await actions.clickOn(space_ui.superMenuButton);
    await actions.clickOn(this.deleteWPButton);
    await actions.setTextReturn(this.deleteInput, wordDelete);
  }
}

const deleteSpaceModalPodio = new DeleteSpaceModalPodio();
module.exports = deleteSpaceModalPodio;
