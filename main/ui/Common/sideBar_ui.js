/**
 * POM Abstractions for SideBar
 */
const { By } = require('selenium-webdriver');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');

/**
 * Page Model for SideBar
 */
class SideBarPodio {
  topRigthMenuButton = By.css('div[data-tooltip-template="hotkey"]');
  sideMenuComponent = By.css('div[class="space-switcher-sidebar visible"]');
  columnGrid = By.className('dashboard ready');
  openSidebarButton = By.css('.space-switcher .search.image-block');
  bodyInformationList = By.css('.expanded .body');
  imageOrganizationIcon = By.css('.img .inner-img');
  expandedSidebarIcon = By.css('#org-nav .expanded img');
  listOrganizationsLabels = By.css('#org-nav .org-navigation .header .bd .vertical-align-middle div');
  contentTreeDodsList = By.css('.action-dropdown-wrapper ul');
  elementContentTreeDodsList = By.css('.action-dropdown-wrapper.align-left .leave-organization');

  /**
   * Workspaces into Podio
   * verify the Side Menu
   */
  async verifySideMenu() {
    await conditions.untilLocated(this.columnGrid);
    await actions.clickOn(this.topRigthMenuButton);
    const respond = await conditions.untilLocated(this.sideMenuComponent);
    return typeof respond === 'object';
  }

  /**
   * Open sidebar, panel of rigth the display list organization
  */
   async openSideBarListOganization(){
    await actions.driver.sleep(1000);
    await actions.clickOn(this.openSidebarButton);
    await conditions.untilLocated(this.bodyInformationList);
    await conditions.untilLocated(this.imageOrganizationIcon);
    await conditions.untilLocated(this.expandedSidebarIcon);
    await conditions.untilLocated(this.listOrganizationsLabels);
  }

  /**
   * Open option characteristics of the organization
   * @param {selector} anOrganization selector the organization selected
   * @param {selector} threeDotsIcon selector three dotss of the organization selected
   */
  async openMenuThreeDotsOfSideBar(anOrganization, threeDotsIcon, optionElement){
    await this.openSideBarListOganization();
    await conditions.untilLocated(this.listOrganizationsLabels);
    await actions.clickOn(anOrganization);
    await conditions.untilLocated(threeDotsIcon);
    await actions.clickOn(threeDotsIcon);
    await conditions.untilLocated(this.contentTreeDodsList);
    await conditions.untilLocated(this.elementContentTreeDodsList);
    await actions.clickOn(optionElement);
  }

   /**
   * Get List Organizations created
   */
  async listOrganizations(){
    await this.openSideBarListOganization();
    const elements = await actions.getWebElements(this.listOrganizationsLabels);
    this.listOrganizationsCreated = [];
    for (const e of elements) {
      this.listOrganizationsCreated.push(await e.getText());
    }
    return this.listOrganizationsCreated;
  }
}

const sideBarPodio = new SideBarPodio();
module.exports = sideBarPodio;
