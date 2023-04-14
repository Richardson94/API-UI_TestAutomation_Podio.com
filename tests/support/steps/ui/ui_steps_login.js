const { expect } = require('expect');
const { When, Then } = require('@cucumber/cucumber');
const loginPodio = require('../../../../main/ui/login_ui');
const configurationManager = require('../../../../core/utils/configuration_manager');
const logger = require('../../../../core/utils/logger_manager');
const conditions = require('../../../../core/utils/conditions');

When('the user login into PODIO with {string} role', async (userRole) => {
  if (configurationManager.environment.sessionExist) {
    logger.info('Logged into Podio ....');
  } else {
    await loginPodio.login(userRole);
    configurationManager.environment.sessionExist = true;
  }
});

Then('the URL to be redirect should be {string}', async (responseUrl) => {
  const response = await conditions.untilUrlLoaded(responseUrl);
  expect(true).toEqual(response);
});

Then('the Home page components should be loaded', async () => {
  const response = await loginPodio.verifyHome();
  expect(true).toEqual(response);
});
