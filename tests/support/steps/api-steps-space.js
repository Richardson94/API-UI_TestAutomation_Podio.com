const { Given, When } = require('@cucumber/cucumber');
const { expect } = require('expect');
const logger = require('../../../../core/utils/logger_manager');

/**
 * Verifies the body values for Spaces
 */
Given('the user should have the following body:', function (dataTable) {
  logger.info('Create and parse the organization_id');
  this.createBody = dataTable.rowsHash();
  this.createBody.org_id = parseInt(this.createBody.org_id);
});

/**
 * Verifies the values of the response body from Create new Space
 */
When(
  'the response body should have the following values SP-01:',
  async function (dataTableRes) {
    const dataResponse = dataTableRes.rowsHash();
    logger.info(
      `Verify the Response when create a new Space as ${dataResponse.url}`
    );
    expect(this.response.data.url).toBe(dataResponse.url);
    expect(this.response.data.full_url).toBe(dataResponse.full_url);
  }
);

/**
 * Verifies the values of the response body from Get Space by ID
 */
When(
  'the response body should have the following values SP-02:',
  async function (dataTableRes) {
    const dataResponse = dataTableRes.rowsHash();
    logger.info(`Verify org_id in get by id ${dataResponse.org_id}`);
    expect(this.response.data.org_id).toBe(parseInt(dataResponse.org_id));
  }
);

/**
 * Verifies the values of the response body from Get Top Spaces
 */
When(
  'the response body should have the following values SP-05:',
  async function (dataTableRes) {
    const dataResponse = dataTableRes.rowsHash();
    logger.info(`Verify First Top Space ${dataResponse.type}`);
    expect(this.response.type).toBe(dataResponse.type);
  }
);
