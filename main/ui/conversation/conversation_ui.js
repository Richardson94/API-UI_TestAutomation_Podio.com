/**
 * POM Abstractions for Conversation Page
 */
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const { By } = require('selenium-webdriver');
const configurationManager = require('../../../core/utils/configuration_manager');
const headerPodio = require('../Common/header_ui');
const actionsDropdownPodio = require('./actionsConversationDropdown_ui');
const addressBookPodio = require('./addressBook_ui');
const createConversationModal = require('./createConversationModal_ui');
const leaveConversationModal = require('./leaveConversationModal_ui');

class ConversationsPodio {
  conversationTab = By.id('all_conversations_tab');
  conversationUnreadTab = By.id('unread_conversations_tab');
  newConversationButton = By.id('new_conversation_button');
  addedIcon = By.xpath("//span[@class='icon-16 icon-16-user-plus-gray']");
  tagUserName =
    "[href='https://podio.com/users/" +
    configurationManager.environment.contacts.contactTwo.userID +
    "']";
  topConversation = By.xpath(
    "//div[@class='conversations-list-container']//li[1]"
  );
  OptionUnreadSpan = By.xpath("//span[@class='icon-16 unread-action tooltip']");
  OptionStarSpan = By.xpath("//span[@class='icon-16 star-action tooltip']");
  OptionUnstarSpan = By.xpath(
    "//li[@class='starred selected']//span[@class='icon-16 star-action tooltip']"
  );
  sendMessageButton = By.xpath(
    "//button[@class='button-new submit-toggler-submit primary baby-button']"
  );
  actionIconMarkReadAll = By.className(
    'icon-16 icon-16-eye mark-all-as-read-trigger tooltip'
  );
  /**
   * Load Conversations page in podio
   */
  async loadConversation() {
    await conditions.untilLocated(By.className('gridster-widget apps'));
    await conditions.untilLocated(headerPodio.conversationIcon);
    await actions.clickOn(headerPodio.conversationIcon);
    await conditions.untilLocated(By.xpath("//li[@class='inbox tooltip']"));
    await actions.clickOn(By.xpath("//li[@class='inbox tooltip']"));
    await conditions.untilUrlLoaded(
      configurationManager.environment.guiUrl + 'conversations'
    );
  }

  /**
   * create new conversation in podio
   */
  async createConversation(subject, message, typeConversation) {
    await conditions.untilLocated(this.sendMessageButton);
    await actions.clickOn(this.newConversationButton);
    await actions.clickOn(createConversationModal.conversationContactList);
    if (typeConversation === 'group') {
      await conditions.untilLocated(By.xpath(addressBookPodio.contactOneID));
      await actions.clickOn(By.xpath(addressBookPodio.contactOneID));
      await conditions.untilLocated(By.xpath(addressBookPodio.contactTwoID));
      await actions.clickOn(By.xpath(addressBookPodio.contactTwoID));
    } else if (typeConversation === 'one') {
      await conditions.untilLocated(By.xpath(addressBookPodio.contactOneID));
      await actions.clickOn(By.xpath(addressBookPodio.contactOneID));
    }
    await actions.clickOn(addressBookPodio.contactDoneButton);
    await actions.setTextReturn(
      createConversationModal.conversationSubject,
      subject
    );
    await actions.setTextReturn(
      createConversationModal.conversationMessage,
      message
    );
    await actions.clickOn(createConversationModal.conversationSendButton);
  }

  /**
   * create new conversation in podio
   */
  async createEmptyConversation() {
    await conditions.untilLocated(this.sendMessageButton);
    await actions.clickOn(this.newConversationButton);
    await actions.clickOn(createConversationModal.conversationSendButton);
  }
  /**
   * leave a conversation created in podio
   */
  async leaveConversation(typeConversation) {
    if (typeConversation === 'group') {
      await actions.clickOn(actionsDropdownPodio.dropDownButton);
      await actions.clickOn(actionsDropdownPodio.selectedLeaveOption);
      await actions.clickOn(leaveConversationModal.confirmButton);
    } else if (typeConversation === 'single') {
      await conditions.untilLocated(By.className('avatars'));
      await actions.clickOn(actionsDropdownPodio.dropDownButton);
      await actions.clickOn(actionsDropdownPodio.selectedAddOption);
      await conditions.untilLocated(By.xpath(addressBookPodio.contactTwoID));
      await actions.clickOn(By.xpath(addressBookPodio.contactTwoID));
      await actions.clickOn(addressBookPodio.contactDoneButton);
      await conditions.untilLocated(this.addedIcon);
      await conditions.untilLocated(By.css(this.tagUserName));
      await actions.clickOn(actionsDropdownPodio.dropDownButton);
      await conditions.untilLocated(actionsDropdownPodio.selectedLeaveOption);
      await actions.clickOn(actionsDropdownPodio.selectedLeaveOption);
      await actions.clickOn(leaveConversationModal.confirmButton);
    }
  }

  /**
   * mark a conversation created as Unread in podio
   */
  async markConversationUnread(type) {
    if (type === 'functional') {
      const conversationCard = await conditions.untilLocated(
        this.topConversation
      );
      await actions.hoverMouse(conversationCard);
      await conditions.untilLocated(this.OptionUnreadSpan);
      await actions.clickOn(this.OptionUnreadSpan);
    } else if (type === 'negative') {
      await actions.clickOn(actionsDropdownPodio.dropDownButton);
    }
  }

  /**
   * mark a conversation created as star in podio
   */
  async markConversationStart() {
    const conversationCard = await conditions.untilLocated(
      this.topConversation
    );
    await actions.hoverMouse(conversationCard);
    await conditions.untilLocated(this.OptionStarSpan);
    await actions.clickOn(this.OptionStarSpan);
  }

  /**
   * mark a conversation created as read in podio
   */
  async markConversationRead() {
    await actions.clickOn(this.conversationUnreadTab);
    const actionIcons = await conditions.untilLocated(
      this.actionIconMarkReadAll
    );
    await actions.hoverMouse(actionIcons);
    await actions.clickOn(this.actionIconMarkReadAll);
    await actions.clickOn(this.conversationTab);
  }

  /**
   * mark a conversation created as unstar in podio
   */
  async markConversationUnstar() {
    await conditions.untilLocated(By.xpath("//li[@class='starred selected']"));
    const conversationCard = await conditions.untilLocated(
      this.topConversation
    );
    await actions.hoverMouse(conversationCard);
    await actions.clickOn(this.OptionUnstarSpan);
  }
}

const conversationsPodio = new ConversationsPodio();
module.exports = conversationsPodio;
