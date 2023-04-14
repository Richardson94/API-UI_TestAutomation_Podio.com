const { Given, When } = require('@cucumber/cucumber');
const { expect } = require('expect');
const { replaceValue } = require('../../../../core/utils/replacer');
const logger = require('../../../../core/utils/logger_manager');

/**
 * Converts the table data of Task summary to object JSON
 */
Given(
  'the user sets the following body for task-summary:',
  function (dataTable) {
    this.createBody = dataTable.rowsHash();
    this.createBody.own = JSON.parse(this.createBody.own);
  }
);

/**
 * Verifies the values of the response body from Create new task
 */
When(
  'the response body should have the following values TA-01:',
  async function (dataResponse) {
    const valueResponse = dataResponse.rowsHash();
    logger.info(`Verify the title of task is ${valueResponse.text}`);
    expect(this.response.data.text).toBe(valueResponse.text);
  }
);

/**
 * Verifies the values of the response body from Get task by id
 */
When(
  'the response body should have the following values TA-02:',
  async function (dataResponse) {
    const valueResponse = dataResponse.rowsHash();
    logger.info(
      `Verify the description of task is ${valueResponse.description}`
    );
    expect(this.response.data.description).toBe(valueResponse.description);
  }
);

/**
 * Verifies the values of the response body from Get task summary
 */
When(
  'the response body should have the following values TA-03:',
  async function (dataResponse) {
    const valueResponse = dataResponse.rowsHash();
    logger.info(
      `Verify the completed_yesterday task ${valueResponse.own.completed_yesterday}`
    );
    expect(this.response.data.completed_yesterday).toBe(
      valueResponse.own.completed_yesterday
    );
  }
);

/**
 * Verifies the values of the response body from Get task for today
 */
When(
  'the response body should have the following values TA-13:',
  async function (dataResponse) {
    const valueResponse = dataResponse.raw();
    const value = valueResponse[0];
    value[1] = replaceValue(value[1], this);
    logger.info(`Verify label_id is ${value[1]}`);
    expect(this.response.data.count).toBe(parseInt(value[1]));
  }
);

/**
 * Verifies the values of the response body from Post label
 */
When(
  'the response body should have the following values TA-14:',
  async function (dataResponse) {
    const valueResponse = dataResponse.raw();
    const value = valueResponse[0];
    value[1] = replaceValue(value[1], this);
    logger.info(`Verify label_id is ${value[1]}`);
    expect(this.response.data.label_id).toBe(parseInt(value[1]));
  }
);

/**
 * Verifies the values of the response body from Get Label
 */
When(
  'the response body should have the following values TA-15:',
  async function (dataResponse) {
    let index = 0;
    const valueResponse = dataResponse.rowsHash();
    for (let i = 0; i < this.response.data.length; i++) {
      if (this.response.data[i].label_id === this.label.data.label_id) {
        index = i;
      }
    }
    logger.info(`Verify text Label is ${valueResponse.text}`);
    expect(this.response.data[index].text).toBe(valueResponse.text);
  }
);
