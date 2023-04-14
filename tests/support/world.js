const {
  setWorldConstructor,
  setDefaultTimeout,
} = require('@cucumber/cucumber');
const configurationManager = require('../../core/utils/configuration_manager');

/**
 * Cucumber context: It sets variables and methods available for each scenario
 * The context is scenario independent, there are no collisions in parallel runs
 */
class CustomWorld {
  createBody;
  response;
  task;
  taskName;
  taskID;
  taskData;
  newOrganization = null;
  conversation;
  conversationID;
  newSpace;
  label;
  labelName;
  labelID;
  driver;
  nameSpace;
  listOrganizationsCreated;
  listNameOrganizations;
  originalWindow;
  attach;
  wordDelete;
  nameWP = configurationManager.environment.workspaceNameTest;

  /**
   * Constructs the initial values
   */
  constructor({ attach }) {
    this.attach = attach;
  }
}
setDefaultTimeout(configurationManager.setUp.explicitTimeout);
setWorldConstructor(CustomWorld);
