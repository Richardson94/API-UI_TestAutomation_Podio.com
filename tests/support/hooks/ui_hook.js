const { By } = require('selenium-webdriver');
const { Before, After, AfterAll, AfterStep } = require('@cucumber/cucumber');
const logger = require('../../../core/utils/logger_manager');
const configurationManager = require('../../../core/utils/configuration_manager');
const DriverManager = require('../../../core/ui/driver_manager');
const taskApi = require('../../../main/api/task_api');
const labelApi = require('../../../main/api/label_api');
const conversationApi = require('../../../main/api/conversation_api');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const organizationApi = require('../../../main/api/organization_api');
const sideBarPodio = require('../../../main/ui/Common/sideBar_ui');
const space_ui = require('../../../main/ui/space/space_ui');
const editSpace_ui = require('../../../main/ui/space/editSpace_ui');

Before({ tags: '@gui', timeout: 30000 }, async function () {
  logger.info('Opening the WebDriver....');
  await DriverManager.init();
  if (configurationManager.environment.sessionExist) {
    await DriverManager.driver.get(
      configurationManager.environment.guiUrl + 'home'
    );
  } else {
    await DriverManager.driver.get(
      configurationManager.environment.guiUrl + 'login'
    );
  }
});

After({ tags: '@conversation' }, async function () {
  logger.info('Deleting All Cookies..');
  logger.name = 'test';
  await DriverManager.cleanNameCookie('chat-pane-is-open');
});

Before({ tags: '@createTaskByAPI' }, async function () {
  logger.info(`Creating task hook ...`);
  this.task = await taskApi.create({
    text: 'Task Hook - UI',
    description: 'Description-Task - UI',
    due_date: new Date().toISOString().slice(0, 10),
    due_time: '22:00:00',
  });
  if (this.task.status === 200) {
    this.taskID = this.task.data.task_id;
  } else {
    logger.warn(`An error occurred when creating the task by API`);
  }
});

Before({ tags: '@createLabelByAPI' }, async function () {
  logger.info(`Creating Label hook ...`);
  this.label = await labelApi.create({
    text: 'API testing',
    color: 'BDB76B',
  });
  if (this.label.status === 200) {
    this.labelID = this.label.data.label_id;
  } else {
    logger.warn(`An error occurred when creating the label by API`);
  }
});

Before({ tags: '@createGroupConversationAPI' }, async function () {
  logger.info(`Creating Group Conversation hook ...`);
  this.conversationApi = await conversationApi.create({
    subject: 'testing',
    text: 'message test',
    participants: [
      {
        type: 'user',
        id: configurationManager.environment.contacts.contactOne.userID,
      },
      {
        type: 'user',
        id: configurationManager.environment.contacts.contactTwo.userID,
      },
    ],
    session: {
      type: 'normal',
      data: '',
    },
  });
  if (this.conversationApi.status === 200) {
    logger.warn(`Conversation Group has been created with API hook ...`);
    this.conversationID = this.conversationApi.data.conversation_id;
  } else {
    logger.warn(`An error occurred when creating a Conversation with API`);
  }
});

Before({ tags: '@createSingleConversationAPI' }, async function () {
  logger.info(`Creating Group Conversation hook ...`);
  this.conversationApi = await conversationApi.create({
    subject: 'testing',
    text: 'message test',
    participants: [
      {
        type: 'user',
        id: configurationManager.environment.contacts.contactOne.userID,
      },
    ],
    session: {
      type: 'normal',
      data: '',
    },
  });
  if (this.conversationApi.status === 200) {
    logger.warn(`Conversation Group has been created with API hook ...`);
    this.conversationID = this.conversationApi.data.conversation_id;
  } else {
    logger.warn(`An error occurred when creating a Conversation with API`);
  }
});

Before({ tags: '@markAsUnread' }, async function () {
  logger.info(`Mark a Group Conversation as unread hook ...`);
  await conversationApi.markUnread(this.conversationID);
});

Before({ tags: '@markAsStar' }, async function () {
  logger.info(`Mark a Group Conversation as unread hook ...`);
  await conversationApi.markStar(this.conversationID);
});

After({ tags: '@deleteTaskByAPI' }, async function () {
  logger.info(`Deleting task hook ...`);
  await taskApi.delete(this.taskID);
});

After({ tags: '@deleteLabelByAPI' }, async function () {
  logger.info(`Deleting Label hook ...`);
  await labelApi.delete(this.labelID);
});

After({ tags: '@leaveConversationGroup' }, async function () {
  logger.info(`Leaving conversation created hook ...`);
  const dropDownButton = By.xpath("//a[contains(.,'Actions')]");
  const selectedOption = By.xpath("//a[.='Leave conversation']");
  const confirmButton = By.className('button-new primary confirm-button');
  const topConversation = By.xpath(
    "//div[@class='conversations-list-container']//li[1]"
  );

  await actions.clickOn(topConversation);
  await actions.clickOn(dropDownButton);
  await actions.clickOn(selectedOption);
  await actions.clickOn(confirmButton);
});

After({ tags: '@leaveConversationSingle' }, async function () {
  logger.info(`Adding Contact into conversation to leave hook ...`);
  const dropDownButton = By.className('action-dropdown align-left');
  const selectedAddOption = By.xpath("//a[.='Add connections']");
  const selectedLeaveOption = By.css(
    '.action-dropdown-wrapper .leave-conversation'
  );
  const confirmButton = By.className('button-new primary confirm-button');
  const contactDoneButton = By.className('button-new done align-right primary');
  const contactTwoID =
    "//*[@data-key='" +
    configurationManager.environment.contacts.contactTwo.userID +
    "']";
  const tagUserName =
    "[href='https://podio.com/users/" +
    configurationManager.environment.contacts.contactTwo.userID +
    "']";
  const topConversation = By.xpath(
    "//div[@class='conversations-list-container']//li[1]"
  );
  await actions.clickOn(topConversation);
  await conditions.untilLocated(By.className('avatars'));
  await actions.clickOn(dropDownButton);
  await actions.clickOn(selectedAddOption);
  await conditions.untilLocated(By.xpath(contactTwoID));
  await actions.clickOn(By.xpath(contactTwoID));
  await actions.clickOn(contactDoneButton);
  await conditions.untilLocated(
    By.xpath("//span[@class='icon-16 icon-16-user-plus-gray']")
  );
  await actions.refreshPage();
  await conditions.untilLocated(By.css(tagUserName));
  await actions.clickOn(dropDownButton);
  await conditions.untilLocated(selectedLeaveOption);
  await actions.clickOn(selectedLeaveOption);
  await actions.clickOn(confirmButton);
});

After({ tags: '@deleteSpace', timeout: 30000 }, async function () {
  const superMenuButton = By.className('icon-16 icon-wrench');
  const deleteWPButton = By.className('delete-space');
  const deleteInput = By.css("input[class='equalToData required']");
  const columnGridD = By.className('add-widget-wrapper');

  logger.info('Deleting Space....');
  await conditions.untilLocated(columnGridD);
  await actions.clickOn(superMenuButton);
  await conditions.untilLocated(deleteWPButton);
  await actions.clickOn(deleteWPButton);
  await actions.setTextReturn(deleteInput, 'delete this workspace');
});

AfterStep('@doActionSideMenu', async function ({ pickleStep }) {
  if (
    pickleStep.text ===
    'the user should can create a new workspace called "testWorkspace"'
  ) {
    await sideBarPodio.verifySideMenu();
  } else if (
    pickleStep.text ===
    'the user should be able to update a workspace to "updateWorkspace"'
  ) {
    await actions.clickOn(space_ui.logoPodio);
    await sideBarPodio.verifySideMenu();
    await editSpace_ui.updateWorkspaces(this.nameWP);
    await actions.clickOn(space_ui.logoPodio);
    await sideBarPodio.verifySideMenu();
    await space_ui.viewWorkspaces();
  } else if (
    pickleStep.text === 'the user should be able archive a workspace'
  ) {
    await actions.clickOn(space_ui.logoPodio);
    await sideBarPodio.verifySideMenu();
    await space_ui.viewWorkspaces();
  }
});

After({ tags: '@deleteOrganization', timeout: 30000 }, async function () {
  logger.info('Deleting Organization ...');
  const workspaceOrAppIcon = By.css('.space-switcher .search');
  const listOrganizationsLabels = By.css('#org-nav .org-navigation .header');

  await actions.clickOn(workspaceOrAppIcon);
  await actions.driver.sleep(1000);
  await conditions.untilLocated(listOrganizationsLabels);
  const listOrganization = await actions.getWebElements(
    listOrganizationsLabels
  );

  await Promise.all(
    listOrganization.map(async (element) => {
      const organization = await element.getAttribute('data-id');
      if (organization !== `${configurationManager.environment.id_org}`) {
        await organizationApi.deleteForURL(organization);
      }
    })
  );
});

AfterAll(async function () {
  logger.info('Closing the WebDriver....');
  await DriverManager.quit();
});

/**
 * Takes an screenshot of the browser
 */
After(async function (testCase) {
  if (testCase.result.status === 'FAILED') {
    try {
      const data3 = await actions.driver.takeScreenshot();
      // eslint-disable-next-line no-undef
      const image3 = Buffer.from(data3, 'base64');
      await this.attach(image3, 'image/png');
    } catch (e) {
      console.log(e.message);
    }
  }
});
