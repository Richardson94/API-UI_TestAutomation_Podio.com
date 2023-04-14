/**
 * POM Abstractions for the modal to leave a conversation
 */
const { By } = require('selenium-webdriver');
/**
 * Page Model for modal to leave
 */
class LeaveConversationModal {
  confirmButton = By.className('button-new primary confirm-button');
  cancelButton = By.xpath("//a[.='Cancel']");
}

const leaveConversationModal = new LeaveConversationModal();
module.exports = leaveConversationModal;
