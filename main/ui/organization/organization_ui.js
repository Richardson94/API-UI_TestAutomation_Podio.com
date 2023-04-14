/**
 * POM Abstractions for login Page
 */
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const { By} = require('selenium-webdriver');
const useApiRequest = require('../../api/organization_api');
const configurationMannager = require('../../../core/utils/configuration_manager');
const headerPodio = require('../../../main/ui/Common/header_ui');
const sideBarPodio = require('../../../main/ui/Common/sideBar_ui');
const modalCreateOrganizationPodio = require('./createOrganizationModal_ui');
const modalDeleteOrganizationPodio = require('./deleteOrganizationModal_ui');
const settingsOrganizationPodio = require('./settingsOrganization_ui');

class OrganizationPodio {
  accountIcon = By.css('.icon-account');
  homeContainer = By.css('.dashboard.ready .gridster');
  newOrganizationSelect = By.css('a[href="#organization/setup"]');
  titleEmployeeLabel = By.css('.bd .header-title');
  titleNameLabel = By.css('.organization-identity .header-title');
  activityLabel = By.css('.stream-noactivity');
  titleTasksLabel = By.css('.tasks .header-title');
  titleFileLabel = By.css('.files .header-title');
  paperClipIcon = By.css('.icon-paper-clip');
  logoIcon = By.className('logo');
  questionIcon = By.css('.question.tooltip span');
  workspaceOrAppIcon = By.css('.space-switcher .search');
  openSidebarButton = By.css('.space-switcher .search.image-block');
  threeDotsButton = By.css(`#org-nav .header:not(div[data-id="${configurationMannager.environment.id_org}"]) .action-dropdown.org-spanner`);
  orgForDeleteButton = By.css(`#org-nav .header:not(div[data-id="${configurationMannager.environment.id_org}"])`);
  settingOrganizationLabel = By.css('a[href$="/organization/edit"]');
  leaveOrganizationLabel = By.css('.action-dropdown-wrapper .leave-organization');

  /**
   * Create new Organization into PODIO
  */
 async createNewOrganization(nameOrganization) {
   await conditions.untilLocated(this.accountIcon);
   await conditions.untilLocated(this.homeContainer);
   await headerPodio.openOptionAccount(this.newOrganizationSelect);
   await modalCreateOrganizationPodio.createNewOrganizationModal(nameOrganization);
  }

  async listLabelsContainers() {
    const dataContainers = {
      employee: await actions.getText(this.titleEmployeeLabel),
      nameOrganization: await actions.getText(this.titleNameLabel),
      activity: await actions.getText(this.activityLabel),
      tasks: await actions.getText(this.titleTasksLabel),
      file: await actions.getText(this.titleFileLabel),
    };
    return dataContainers;
  }

  /**
   * Get List Organizations created
   */
  async listOrganizations(){
    return await sideBarPodio.listOrganizations();
  }

  /**
   * Create Organizations
   * @param {array} listNameOrganizations
   */
  async createListOrganizations(listNameOrganizations) {
    this.response = useApiRequest.create(listNameOrganizations[0]);
    await actions.clickOn(this.logoIcon);
    await conditions.untilLocated(this.paperClipIcon);
    await conditions.untilLocated(this.questionIcon);
    await conditions.untilLocated(this.workspaceOrAppIcon);
  }

  /**
   * Delete an organization through sidebar and settings
   * @param {text} textForDelete
   */
  async deleteOrganization(textForDelete){
      await modalDeleteOrganizationPodio.deleteOrganizationModal(textForDelete);
  }

  /**
   * Update an organization
   * @param {text} updateName is the new name of the organization
   */
  async updateOrganization(updateName){
    await conditions.untilLocated(this.questionIcon);
    await conditions.untilLocated(this.workspaceOrAppIcon);
    await conditions.untilLocated(this.openSidebarButton);
    await sideBarPodio.openMenuThreeDotsOfSideBar(this.orgForDeleteButton,this.threeDotsButton, this.settingOrganizationLabel);
    await settingsOrganizationPodio.updateOrganizationSettings(updateName)
  }

  /**
   * Go to home page Podio
   */
  async goToHomePage(){
    await conditions.untilLocated(this.logoIcon);
    await actions.clickOn(this.logoIcon);
  }

  /**
   * Go to modal new Organization into PODIO
  */
 async goToCreateNewOrganization() {
  await conditions.untilLocated(this.accountIcon);
  await conditions.untilLocated(this.homeContainer);
  await headerPodio.openOptionAccount(this.newOrganizationSelect);
 }

  /**
   * Go to settings Organization into PODIO
  */
 async goToSettingOrganization() {
  await conditions.untilLocated(this.questionIcon);
  await conditions.untilLocated(this.openSidebarButton);
  await conditions.untilLocated(this.workspaceOrAppIcon);
  await sideBarPodio.openMenuThreeDotsOfSideBar(this.orgForDeleteButton,this.threeDotsButton, this.settingOrganizationLabel);
 }

 /**
   * Sidebar leave Organization into PODIO
  */
 async goToLeaveOrganizationSidebar() {
  await conditions.untilLocated(this.questionIcon);
    await conditions.untilLocated(this.workspaceOrAppIcon);
    await conditions.untilLocated(this.openSidebarButton);
  await sideBarPodio.openMenuThreeDotsOfSideBar(this.orgForDeleteButton, this.threeDotsButton, this.leaveOrganizationLabel);
 }

 /**
   * Delete an organization through sidebar or settings
   * @param {boolean} optionDelete, for default true leave organization through sidebar, and false through setting organization
   */
 async goToLeaveOrganization(optionDelete = true){
  if(optionDelete){
    this.goToLeaveOrganizationSidebar();
  }else{
    await this.goToSettingOrganization();
    await settingsOrganizationPodio.goToLeaveOrganization();
  }
}


}

const organizationGui = new OrganizationPodio();
module.exports = organizationGui;
