const { Given, When } = require('@cucumber/cucumber');
const { expect } = require('expect');
const logger = require('../../../../core/utils/logger_manager');
const conversationApi = require('../../../../main/api/conversation_api');

Given(
  'the user should have the following body for conversation with one user:',
  async function (dataTable) {
    logger.info('Create and parse the conversation_body');
    this.createBody = dataTable.rowsHash();
    this.createBody.participants = await conversationApi.generateOneContact();
    this.createBody.session = JSON.parse(this.createBody.session);
  }
);

Given(
  'the user should have the following body for conversation with more than one user:',
  async function (dataTable) {
    logger.info('Create and parse the conversation_body');
    this.createBody = dataTable.rowsHash();
    this.createBody.participants = await conversationApi.generateContacts();
    this.createBody.session = JSON.parse(this.createBody.session);
  }
);
/**
 * Verifies the values of the response body from create a new Conversation
 */
When(
  'the response body should have following values CO-01-02:',
  async function (dataResponse) {
    const valueResponse = dataResponse.rowsHash();
    expect(this.response.data.subject).toEqual(valueResponse.subject);
    expect(this.response.data.excerpt).toEqual(valueResponse.text);
  }
);
/**
 * Verifies the values of the response body from Get all the conversation
 */
When(
  'the response body should have following values CO-03:',
  async function (dataResponse) {
    const valueResponse = dataResponse.rowsHash();
    expect(this.response.data[0].presence.ref_type).toBe(
      valueResponse.ref_type
    );
    expect(this.response.data[0].type).toBe(valueResponse.type);
  }
);
/**
 * Verifies the values of the response body from Get a specific conversation
 */
When(
  'the response body should have following values CO-04:',
  async function (dataResponse) {
    const valueResponse = dataResponse.rowsHash();
    expect(this.response.data[0].action).toBe(valueResponse.action);
  }
);
