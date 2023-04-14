const axios = require('axios');
const configurationManager = require('../../core/utils/configuration_manager');
const logger = require('../utils/logger_manager');

class RequestManager {
  async send(user, httpRequestMethod, endpoint, body) {
    const authorization = configurationManager.environment.users[user];
    const options = {
      method: httpRequestMethod,
      url: `${configurationManager.environment.apiUrl}${endpoint}`,
      headers: authorization,
      data: body,
      validateStatus: undefined,
    };
    logger.debug(
      `Sending a ${user} request to ${options.url} with ${httpRequestMethod} method`
    );
    const response = await axios.request(options);
    logger.debug(`Response returned with  ${response.status} code`);
    return response;
  }

  async sendDelete(user, endpoint, optionalHeaders = null) {
    const authorization = configurationManager.environment.users['userPage'];
    const options = {
      method: 'DELETE',
      url: `${endpoint}`,
      headers: optionalHeaders !== null ? optionalHeaders : authorization,
      validateStatus: undefined,
    };
    logger.debug(
      `Sending a ${user} request to ${options.url} with DELETE method`
    );
    const response = await axios.request(options);
    logger.debug(`Response returned with  ${response.status} code`);
    return response;
  }
}

module.exports = new RequestManager();
