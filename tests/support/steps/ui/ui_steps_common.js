/**
 * Common steps
 */

const { expect } = require('expect');
const { When } = require('@cucumber/cucumber');
const actions = require('../../../../core/utils/actions');
const conditions = require('../../../../core/utils/conditions');

When('the page title should be {string}', async (expectedTitle) => {
  await conditions.untilTitleIs(expectedTitle);
  const actualResult = await actions.driver.getTitle();
  expect(actualResult).toEqual(expectedTitle);
});
