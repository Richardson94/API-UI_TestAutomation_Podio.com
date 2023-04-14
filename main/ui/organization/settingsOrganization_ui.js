/**
 * POM Abstractions for login Page
 */
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const { By} = require('selenium-webdriver');

class SettingsOrganizationPodio {
  dropFileLabel = By.css('.dropzone');
  updateNameText = By.id('organization_name');
  notificationUpdate= By.css('.push-notifications-wrapper');
  saveUpateButton = By.css('.button-new.primary');
  nameOrganizationSettingLabel = By.css('.org-content.edit h3');
  optionLeaveOrganization = By.css('.delete-org-old.button-new.secondary');

  /**
   * Update an organization
   * @param {text} updateName is the new name of the organization
   */
  async updateOrganizationSettings(updateName){
    await conditions.untilLocated(this.dropFileLabel);
    await conditions.untilLocated(this.saveUpateButton);
    await actions.setText(this.updateNameText, updateName);
    await actions.clickOn(this.saveUpateButton);
    await conditions.untilLocated(this.notificationUpdate);
    await conditions.untilLocated(this.saveUpateButton);
    await conditions.untilLocated(this.dropFileLabel);
  }

  /**
   * Get the name organization
   * @returns the name the organization
   */
  async getNameOrganizationLabelSettings(){
    await conditions.untilLocated(this.dropFileLabel);
    await conditions.untilLocated(this.saveUpateButton);
    return await actions.getText(this.nameOrganizationSettingLabel);
  }

  /**
   * Verify validate name organization
   * @returns true if validate name organization, false otherwise
   */
  async verifyValidationNameField(){
    await conditions.untilLocated(this.dropFileLabel);
    await conditions.untilLocated(this.saveUpateButton);
    await actions.setText(this.updateNameText,"");
    await actions.clickOn(this.saveUpateButton);
    const isValidateName = await actions.getAttributeValue(this.updateNameText,"class");
    return isValidateName === "error";
  }

  async goToLeaveOrganization(){
    await conditions.untilLocated(this.dropFileLabel);
    await conditions.untilLocated(this.saveUpateButton);
    await conditions.untilLocated(this.optionLeaveOrganization);
    await actions.clickOn(this.optionLeaveOrganization);
  }
}

const settingsOrganizationPodio = new SettingsOrganizationPodio();
module.exports = settingsOrganizationPodio;
