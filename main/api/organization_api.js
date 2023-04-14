const Request_manager = require('../../core/api/request_manager');
/**
 * Sets static values from configuration and environment files
 */
class OrganizationApi {
  /**
   * Create a Organization
   */
  async create(body) {
    const response = await Request_manager.send('admin','POST',`/org/`,body);
    return response;
  }

  /**
   * Delete a Organization
   */
  async deleteForURL(org_id) {
    const response = await Request_manager.sendDelete('admin',`https://podio.com/_json/organization/${org_id}/leave.json`);
    return response;
  }
}

module.exports = new OrganizationApi();
