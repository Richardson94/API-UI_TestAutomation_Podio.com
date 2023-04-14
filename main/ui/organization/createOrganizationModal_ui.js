/**
 * POM Abstractions for login Page
 */
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const { By} = require('selenium-webdriver');

class CreateOrganizationModalPodio {
  logoImageIcon = By.css('.podio-uploader-file .icon');
  nameText = By.id('organization_name');
  numberEmployeesList = By.css('div.podio-dropdown-selector');
  numberEmployeesSelect = By.css('#podiodropdown-organization_segment_size-i1');
  createButton = By.css('input.next.button-new.primary');
  pushNotification = By.css('li.notification.flashmessage.notice div');
  tooltipErrorIcon = By.css('#organization_setup .required');

  /**
   * Create new Organization into PODIO
   */
  async createNewOrganizationModal(nameOrganization) {
    await conditions.untilLocated(this.nameText);
    await conditions.untilLocated(this.logoImageIcon);
    await actions.setText(this.nameText, nameOrganization);
    await conditions.untilLocated(this.numberEmployeesList);
    await actions.clickOn(this.numberEmployeesList);

    const selectElement = await actions.driver.findElement(
      this.numberEmployeesSelect
      );
      const parent_element = selectElement.findElement(By.xpath('..'));
      parent_element.click();
      await conditions.untilLocated(this.createButton);
      await actions.driver.sleep(1000);
      await actions.clickOn(this.createButton);
      await conditions.untilLocated(this.pushNotification);
  }

  /**
   * Click in button create organization, waiting for modal elements to be loaded
   */
  async clickCreateOrganizationButton(){
    await conditions.untilLocated(this.nameText);
    await conditions.untilLocated(this.createButton);
    await conditions.untilLocated(this.logoImageIcon);
    await actions.clickOn(this.createButton);
  }

  /**
   * Verify that all required elements have their validation
   * @returns False if any required field is not validated, and true if all fields are validated
   */
  async verifyValidationAllRequiredFields(){
    await conditions.untilLocated(this.nameText);
    await conditions.untilLocated(this.createButton);
    await conditions.untilLocated(this.logoImageIcon);
    const elementsErrors = await actions.getWebElements(this.tooltipErrorIcon);
    let isDisplayed=true;
    await Promise.all(
      elementsErrors.map(async (element) => {
        const data = await element.getAttribute('class');
        if (!data.includes("error")) {
          isDisplayed=false;
        }
      })
    );

    return await isDisplayed;
  }

}

const modalCreateOrganizationPodio = new CreateOrganizationModalPodio();
module.exports = modalCreateOrganizationPodio;

