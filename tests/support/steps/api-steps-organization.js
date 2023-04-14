const { Then, When } = require('@cucumber/cucumber');
const { expect } = require('expect');
const logger = require('../../../../core/utils/logger_manager');


/**
 * Verifies the values of the response body from create organization
 */
When('the response body should have the following values OR-01:',async function(dataResponse){
    const valuesResponse = dataResponse.rowsHash();
    logger.info(`Verify the most important data for endpoint Create  ${valuesResponse}`);
    expect(this.response.data.url).toContain(valuesResponse.url);
    expect(this.response.data.url_label).toContain(valuesResponse.url_label);
});

/**
 * Verifies the values of the response body from Get Organization
 */
When('the response body should have the following values OR-02:',async function(dataResponse){
    const outputData = dataResponse.rowsHash();
    logger.info(`Verify the most important data for endpoint Get  ${outputData}`);
    const findElement = this.response.data.find((item)=>{return item.name === outputData.name})
    expect(findElement.name).toContain(outputData.name);
    expect(findElement.url_label).toContain(outputData.url_label);
    expect(findElement.url).toContain(outputData.url);
    expect(findElement.role).toBe(outputData.role);
    expect(findElement.type).toBe(outputData.type);
    expect(findElement.status).toBe(outputData.status);
});

/**
 * Verifies the test negative for delete Organization
 */
Then('the response body should have the following data errors:',async function(dataResponse){
    const outputData = dataResponse.rowsHash();
    logger.info(`Verify the most important data  ${outputData}`);
    expect(this.response.data.error_parameters).toStrictEqual({});
    expect(this.response.data.error_detail).toBe(null);
    expect(this.response.data.error_propagate).toBe(false);
    expect(this.response.data.error_description).toBe(outputData.error_description);
    expect(this.response.data.error).toBe(outputData.error);
});
