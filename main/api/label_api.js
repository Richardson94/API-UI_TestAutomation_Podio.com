const Request_manager = require('../../core/api/request_manager');
/**
 * Sets static values from configuration and environment files
 */
class LabelApi {
  /**
   * Create a Label
   */
  async create(body) {
    const response = await Request_manager.send(
      'admin',
      'POST',
      `/task/label/`,
      body
    );
    return response;
  }
  /**
   * Delete a Label
   */
  async delete(label_id) {
    await Request_manager.send(
      'admin',
      'DELETE',
      `/task/label/${label_id}`,
      {}
    );
  }
}

module.exports = new LabelApi();
