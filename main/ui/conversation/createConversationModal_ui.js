/**
 * POM Abstractions for the component dropdown "Actions" in conversation page
 */
const { By } = require('selenium-webdriver');
/**
 * Page Model for Actions Dropdown
 */
class CreateConversationModal {
  conversationContactList = By.className(
    'button-new secondary baby-button activate-people-finder'
  );
  conversationSubject = By.id('conversation_subject_v2');
  conversationMessage = By.id('conversation_text_v2');
  conversationSendButton = By.id('send_conversation_button_v2');
}

const createConversationModal = new CreateConversationModal();
module.exports = createConversationModal;
