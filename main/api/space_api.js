const Request_manager = require('../../core/api/request_manager');
/**
 * Sets static values from configuration and environment files
 */
class SpaceApi {
  /**
   * Create a Space
   */
  async create(body) {
    const response = await Request_manager.send(
      'admin',
      'POST',
      `/space/`,
      body
    );
    return response;
  }
}

module.exports = new SpaceApi();
