/**
 * POM Abstractions for login Page
 */
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const { By} = require('selenium-webdriver');

class DeleteOrganizationModalPodio {
  leaveOrganizationInputText = By.css('.modal-delete-confirm-input input');
  leaveButton = By.css('.modal-delete .confirm-button');
  validateIcon = By.css('.equalToData.required');
  closeButton = By.css('.modal-delete .button-new.secondary');
  hamburgerIcon = By.css('.search.image-block.tooltip-delayed.tooltip-html .img div');
  mainContainer = By.css('.grid.main');
  titleLabel = By.css('.modal-delete-confirm-title');
 
  /**
   * Delete an organization
   * @param {text} textForLeaveOrganziation
   */
  async deleteOrganizationModal(textForLeaveOrganziation){
    await conditions.untilLocated(this.leaveOrganizationInputText);
    await conditions.untilLocated(this.leaveButton);
    await actions.setText(this.leaveOrganizationInputText, textForLeaveOrganziation);
    await actions.clickOn(this.leaveButton);
  }
  
  /**
   * Delete an organization
   * @param {text} textForDelete 
   * @returns true if the parameter textForDelete not is validate, false othercase
   */
  async verifyValidateLeaveOrganizationModal(textForDelete){
    await conditions.untilLocated(this.leaveOrganizationInputText);
    await conditions.untilLocated(this.leaveButton);
    await actions.setText(this.leaveOrganizationInputText, textForDelete);
    await conditions.untilLocated(this.leaveOrganizationInputText);
    await actions.clickOn(this.leaveButton);
    let isValidate = await actions.getAttributeValue(this.validateIcon,"class") ;
    return isValidate.includes("error");
  }
  
  /**
   * Clean field leave organization
  */
 async cleanFieldLeaveOrganization(){
   await conditions.untilLocated(this.leaveOrganizationInputText);
   await conditions.untilLocated(this.leaveButton);
   await actions.clickOn(this.titleLabel);
   let element = await actions.getWebElement(this.leaveOrganizationInputText)
   element.clear();
   await actions.clickOn(this.titleLabel);
  }
 
  /**
   * Close modal leave organization
   */
  async closeLeaveOrganizationModal(){
    await conditions.untilLocated(this.leaveOrganizationInputText);
    await conditions.untilLocated(this.leaveButton);
    await actions.clickOn(this.closeButton);
    await actions.clickOn(this.mainContainer);
    await conditions.untilLocated(this.hamburgerIcon);
  }
 
}

const modalDeleteOrganizationPodio = new DeleteOrganizationModalPodio();
module.exports = modalDeleteOrganizationPodio;
