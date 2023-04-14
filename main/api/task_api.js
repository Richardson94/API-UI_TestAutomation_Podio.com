const Request_manager = require('../../core/api/request_manager');
/**
 * Sets static values from configuration and environment files
 */
class TaskApi {
  /**
   * Create a Task
   */
  async create(body) {
    const response = await Request_manager.send(
      'admin',
      'POST',
      `/task/`,
      body
    );
    return response;
  }
  /**
   * Delete a Task
   */
  async delete(task_id) {
    await Request_manager.send('admin', 'DELETE', `/task/${task_id}`, {});
  }
}

module.exports = new TaskApi();
