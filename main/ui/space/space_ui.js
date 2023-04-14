/**
 * POM Abstractions for Workspaces
 */
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const config = require('../../../core/utils/configuration_manager');
const sideBarPodio = require('../Common/sideBar_ui');
const { By } = require('selenium-webdriver');

class WorkspacePodio {
  nameWP = config.environment.workspaceNameTest;
  logoPodio = By.className('logo-img');
  createWorkspaceButton = By.css(
    `a[data-org-id="${config.environment.id_org}"]`
  );
  createComponentModal = By.className('modal-wrapper');
  spaceButton = By.css(`a[data-url-label="${this.nameWP}"]`);
  mngWorkspacesButton = By.css(
    `div[data-id='${config.environment.id_org}'] + div .manage-workspaces`
  );
  superMenuButton = By.className('icon-16 icon-wrench');
  columnGridD = By.className('add-widget-wrapper');
  archiveSpaceButton = By.xpath(
    `//a[text()='${this.nameWP}']// .. //a[text()='Archive']`
  );
  archiveConfirmModalButton = By.xpath("//button[text()='Archive']");
  cancelArchiveModalButton = By.xpath("//a[text()='Cancel']");
  spaceToArchiveItem = By.xpath(`//a[text()='${this.nameWP}']`);
  archivedSpacesButton = By.xpath("//span[text()='Archived workspaces']");
  restoreButton = By.xpath(
    `//a[text()='${this.nameWP}']// .. //a[text()="Restore"]`
  );
  restoreModalButton = By.xpath("//button[text()='Restore']");

  /**
   * Open the Modal For Create Workspace
   */
  async openCreateWorkspace() {
    const respond = await conditions.untilLocated(this.createWorkspaceButton);
    if (typeof respond === 'object') {
      await actions.clickOn(this.createWorkspaceButton);
      const newWindow = await conditions.untilVisible(
        this.createComponentModal
      );
      return typeof newWindow === 'object';
    }
  }

  /**
   * verify all workspaces in a Organization
   */
  async viewWorkspaces() {
    const orgSection = await actions.getWebElement(this.mngWorkspacesButton);
    await actions.clickOn(this.mngWorkspacesButton);
    return typeof orgSection === 'object';
  }

  /**
   * verify that the user can select for delete the Workspace
   */
  async selectWorkspace() {
    await conditions.untilLocated(this.spaceButton);
    const space = actions.getWebElement(this.spaceButton);
    await actions.clickOn(this.spaceButton);
    return space === 'object';
  }

  /**
   * verify that the user can archive a Workspace
   */
  async archiveWorkspace(flag) {
    await conditions.untilLocated(this.archiveSpaceButton);
    await actions.clickOn(this.archiveSpaceButton);
    let space;
    if (flag) {
      await conditions.untilLocated(this.archiveConfirmModalButton);
      await actions.clickOn(this.archiveConfirmModalButton);
      await actions.refreshPage();
      space = await conditions.isVisible(this.spaceToArchiveItem);
    } else {
      await conditions.untilLocated(this.cancelArchiveModalButton);
      await actions.clickOn(this.cancelArchiveModalButton);
      space = await conditions.isVisible(this.spaceToArchiveItem);
      await actions.clickOn(this.logoPodio);
      await sideBarPodio.verifySideMenu();
      await this.selectWorkspace();
    }
    return space;
  }

  /**
   * verify that the user can unarchive a Workspace
   */
  async unarchiveWorkspace(flag) {
    let isVisible;
    await conditions.untilLocated(this.archivedSpacesButton);
    await actions.clickOn(this.archivedSpacesButton);
    await conditions.untilLocated(this.restoreButton);
    await actions.clickOn(this.restoreButton);

    if (flag) {
      await conditions.untilLocated(this.restoreModalButton);
      await actions.clickOn(this.restoreModalButton);
      isVisible = await conditions.isVisible(this.spaceToArchiveItem);
      await actions.clickOn(this.logoPodio);
      await sideBarPodio.verifySideMenu();
      await this.selectWorkspace();
    } else {
      await conditions.untilLocated(this.cancelArchiveModalButton);
      await actions.clickOn(this.cancelArchiveModalButton);
      isVisible = await conditions.isVisible(this.spaceToArchiveItem);
      await actions.refreshPage();
      await this.unarchiveWorkspace(true);
    }
    return await isVisible;
  }
}

const workspacePodio = new WorkspacePodio();
module.exports = workspacePodio;
