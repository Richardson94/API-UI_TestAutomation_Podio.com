const { expect } = require('expect');
const { When, Then } = require('@cucumber/cucumber');
const conversationsPodio = require('../../../../main/ui/conversation/conversation_ui');
const { By } = require('selenium-webdriver');
const Conditions = require('../../../../core/utils/conditions');

When('the user can enter on sidebar to see all conversations', async () => {
  await conversationsPodio.loadConversation();
});

Then(
  'the URL to be redirect should be {string} conversations',
  async (responseUrl) => {
    const response = await Conditions.untilUrlLoaded(responseUrl);
    expect(true).toEqual(response);
  }
);

Then(
  'the user can create a new chanel with a group of users',
  async (dataTable) => {
    const data = dataTable.rowsHash();
    conversationsPodio.createConversation(data.subject, data.message, 'group');
  }
);

Then('the user can create a new chanel with one user', async (dataTable) => {
  const data = dataTable.rowsHash();
  conversationsPodio.createConversation(data.subject, data.message, 'one');
});

Then(
  'the conversation should be created with {string} message',
  async (conversationMessage) => {
    const response = await Conditions.untilLocated(
      By.xpath("//p[contains(text(),'" + conversationMessage + "')]")
    );
    expect(response).toBeDefined();
  }
);

Then('the user can leave a {string} conversation', async (conversationType) => {
  await conversationsPodio.leaveConversation(conversationType);
});

Then('the conversation should not be displayed', async () => {
  const response = await Conditions.isVisible(
    By.xpath("//p[contains(text(),'message test')]")
  );
  const checkleave = await Conditions.untilLocated(
    By.xpath("//p[.='No message selected']")
  );
  expect(response).toBeFalsy();
  expect(checkleave).toBeDefined();
});

Then('the user can mark a conversation created as unread', async () => {
  await conversationsPodio.markConversationUnread('functional');
});

Then('A dot should be display before the avatar', async () => {
  const response = await Conditions.untilLocated(
    By.xpath(
      "//li[@class='unread selected']/div[@class='icon-16 icon-unread icon-16-unread-dot-blue']"
    )
  );
  expect(response).toBeDefined();
});

Then('the user can mark a conversation created as star', async () => {
  await conversationsPodio.markConversationStart();
});

Then(
  'A star should be display at the end of the conversation card',
  async () => {
    const response = await Conditions.untilLocated(
      By.xpath(
        "//li[@class=' starred selected']//span[@class='icon-16 star-action tooltip']"
      )
    );
    expect(response).toBeDefined();
  }
);

Then('the user can mark as read an unread conversation created', async () => {
  await conversationsPodio.markConversationRead();
});

Then('A dot should not be display before the avatar', async () => {
  const response = await Conditions.isVisible(
    By.xpath(
      "//li[@class='unread selected']/div[@class='icon-16 icon-unread icon-16-unread-dot-blue']"
    )
  );
  expect(response).toBeFalsy();
});

Then(
  'the user can mark as unstar an started conversation created',
  async () => {
    await conversationsPodio.markConversationUnstar();
  }
);

Then(
  'A star should not be display at the end of the conversation card',
  async () => {
    const response = await Conditions.isVisible(
      By.xpath(
        "//li[@class=' starred selected']//span[@class='icon-16 star-action tooltip']"
      )
    );
    expect(response).toBeFalsy();
  }
);

Then(
  'the conversation cannot be created with thte fields unfilled',
  async () => {
    await conversationsPodio.createEmptyConversation();
  }
);

Then('the conversation should not be created cause warnings', async () => {
  const responseList = await Conditions.isVisible(
    By.xpath(
      "//div[@class='elastic-textarea']//label[@class='form-validation-invalid-icon icon-16 icon-16-red-warning-triangle tooltip error']"
    )
  );
  const responseMessage = await Conditions.isVisible(
    By.xpath(
      "//div[@class='elastic-textarea']//label[@class='form-validation-invalid-icon icon-16 icon-16-red-warning-triangle tooltip error']"
    )
  );
  expect(responseList).toBeTruthy();
  expect(responseMessage).toBeTruthy();
});

Then('the user can not mark as unread an unread conversation', async () => {
  await conversationsPodio.markConversationUnread('negative');
});

Then('the option to mark as unread should not be able', async () => {
  const response = await Conditions.isVisible(
    By.xpath(
      "//div[@class='action-dropdown-wrapper align-left']//a[.='Mark as unread']"
    )
  );

  expect(response).toBeTruthy();
});
