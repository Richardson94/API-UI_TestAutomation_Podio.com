const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('expect');
const Request_manager = require('../../../../core/api/request_manager');
const logger = require('../../../../core/utils/logger_manager');
const { cwd } = require('process');
const {
  validateSchemaFromPath,
} = require('../../../../core/utils/schema_validator');
const { replaceValue } = require('../../../../core/utils/replacer');

/**
 * Converts the table data to key-value
 */
Given('the user sets the following body:', function (createData) {
  this.createBody = createData.rowsHash();
});

/**
 * Send of request endpoint
 */
When(
  'the {string} user sends a {string} request to {string} endpoint',
  async function (user, httpRequestMethod, endpoint) {
    endpoint = replaceValue(endpoint, this);
    this.response = await Request_manager.send(
      user,
      httpRequestMethod,
      endpoint,
      this.createBody
    );
  }
);

/**
 * Verifies the status code of a request
 */
When(
  'the response status code should be {int}',
  async function (expectedCodeStatus) {
    logger.info(`Verify the correct status is ${expectedCodeStatus}`);
    expect(this.response.status).toBe(expectedCodeStatus);
  }
);

/**
 * Verifies the value of the response statusText when the response doesn't return data
 */
When(
  'the response body should have the following value in statusText:',
  async function (dataResponse) {
    const valueResponse = dataResponse.rowsHash();
    logger.info(`The status text is ${this.response.statusText}`);
    expect(this.response.statusText).toBe(valueResponse.statusText);
  }
);

/**
 * Verifies the value in data error
 */
When(
  'the response body should have the following value in data error:',
  async function (dataResponse) {
    const valueResponse = dataResponse.rowsHash();
    logger.info(`The data error is ${valueResponse.error}`);
    expect(this.response.data.error).toBe(valueResponse.error);
  }
);

/**
 * Verifies the value in data error description
 */
When(
  'the response body should have the following value in data error-description:',
  async function (dataResponse) {
    const valueResponse = dataResponse.rowsHash();
    logger.info(`The data error is ${valueResponse.error_description}`);
    expect(this.response.data.error_description).toBe(
      valueResponse.error_description
    );
  }
);

/**
 * Verifies the schema of a response data
 */
Then(
  'the schema response is the same with {string}',
  async function (schemaName) {
    const schemaPath = `${cwd()}\\main\\resources\\${schemaName}.json`;
    logger.info(`Verify the schema with ${schemaPath}`);
    expect(validateSchemaFromPath(this.response.data, schemaPath)).toBeTruthy();
  }
);
