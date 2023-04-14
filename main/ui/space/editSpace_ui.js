/**
 * POM Abstractions for EditSpace
 */
const { By } = require('selenium-webdriver');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const space_ui = require('./space_ui');
const sideBarPodio = require('../Common/sideBar_ui');
/**
 * Page Model for EditSpace
 */
class EditSpacePodio {
  editInput = By.id('space_name');
  workspaceNavBar = By.css("ul[class = 'app-nav app-list']");
  validationNameUpdateInput = By.css('label[for="space[name]"]');
  settingButton = By.css(
    "div[class='popover-menu'] span[class='sprite-icon icon-16-tools']"
  );
  /**
   * verify that the user can Update the Workspace
   */
  async updateWorkspaces(newName) {
    await this.configSteps();
    await this.editSteps();
    await actions.setTextReturn(this.editInput, newName);
    this.nameWP = newName.toLowerCase();
    await actions.refreshPage();
    await actions.clickOn(space_ui.logoPodio);
    await sideBarPodio.verifySideMenu();
    await space_ui.selectWorkspace();
    return this.nameWP !== 'testWorkspace';
  }

  /**
   * verify that the user cannot Update the Workspace with "Workspace Name" in blank
   */
  async updateWorkspaceBlank() {
    let response = '';
    await this.configSteps();
    await this.editSteps();
    await conditions.isVisible(this.workspaceNavBar);
    await actions.setTextReturn(this.editInput, ' ');
    await conditions.untilLocated(this.validationNameUpdateInput);
    response = await actions.getAttributeValue(
      this.validationNameUpdateInput,
      'title'
    );
    await actions.refreshPage();
    await actions.clickOn(space_ui.logoPodio);
    await sideBarPodio.verifySideMenu();
    await space_ui.selectWorkspace();
    return response;
  }

  async configSteps() {
    await conditions.untilLocated(space_ui.spaceButton);
    await actions.clickOn(space_ui.spaceButton);
    await conditions.untilLocated(space_ui.columnGridD);
    await actions.clickOn(space_ui.superMenuButton);
  }

  async editSteps() {
    await conditions.untilLocated(this.settingButton);
    await actions.clickOn(this.settingButton);
    await conditions.untilLocated(this.editInput);
  }
}

const editSpacePodio = new EditSpacePodio();
module.exports = editSpacePodio;
