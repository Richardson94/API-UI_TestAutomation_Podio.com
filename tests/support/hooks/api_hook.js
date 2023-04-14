const { Before, After } = require('@cucumber/cucumber');
const logger = require('../../../core/utils/logger_manager');
const taskApi = require('../../../main/api/task_api');
const orgApi = require('../../../main/api/organization_api');
const conversationApi = require('../../../main/api/conversation_api');
const labelApi = require('../../../main/api/label_api');
const space_api = require('../../../main/api/space_api');
const ConfigurationManager = require('../../../core/utils/configuration_manager');

Before({ tags: '@createTask' }, async function () {
  logger.info(`Creating task hook ...`);
  this.task = await taskApi.create({
    text: 'Task Hook',
    description: 'Description-Task',
    due_date: new Date().toISOString().slice(0, 10),
    due_time: '19:00:00',
  });
});

Before({ tags: '@createLabel' }, async function () {
  logger.info(`Creating label hook ...`);
  this.label = await labelApi.create({
    text: 'API testing',
    color: 'BDB76B',
  });
});

Before({ tags: '@createSpace' }, async function () {
  logger.info(`Creating space hook ...`);
  this.newSpace = await space_api.create({
    org_id: ConfigurationManager.environment.id_org,
    name: 'testworkspace',
  });
});

Before({ tags: '@createConversation' }, async function () {
  logger.info(`Creating conversation hook ...`);
  this.conversation = await conversationApi.create({
    subject: 'testing',
    text: 'first text',
    participants: await conversationApi.generateContacts(),
    session: {
      type: 'normal',
      data: '',
    },
  });
});

After({ tags: '@deleteLabel' }, async function () {
  logger.info(`Deleting label hook ...`);
  if (this.label === undefined) {
    await labelApi.delete(this.response.data.label_id);
  } else {
    await labelApi.delete(this.label.data.label_id);
  }
});

After({ tags: '@deleteTask' }, async function () {
  logger.info(`Deleting task hook ...`);
  if (this.task === undefined) {
    await taskApi.delete(this.response.data.task_id);
  } else {
    await taskApi.delete(this.task.data.task_id);
  }
});

After({ tags: '@deleteConversation' }, async function () {
  logger.info(`Deleting conversation hook ...`);
  if (this.conversation === undefined) {
    await conversationApi.delete(this.response.data.conversation_id);
  } else {
    await conversationApi.delete(this.conversation.data.conversation_id);
  }
});

Before({ tags: '@createOrganization' }, async function () {
  logger.info(`Creating Organization hook ...`);
  this.newOrganization = await orgApi.create({ name: 'newOrg' });
});

After({ tags: '@deleteOrgCreate' }, async function () {
  logger.info(`Deleting organization hook ...`);
  await orgApi.deleteForURL(this.response.data.org_id);
});

After({ tags: '@deleteOrg' }, async function () {
  logger.info(`Deleting organization hook ...`);
  await orgApi.deleteForURL(this.newOrganization.data.org_id);
});
