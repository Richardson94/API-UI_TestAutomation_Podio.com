const Request_manager = require('../../core/api/request_manager');
/**
 * Sets static values from configuration and environment files
 */
class ConversationApi {
  /**
   * Create a Conversation
   */
  async create(body) {
    const response = await Request_manager.send(
      'admin',
      'POST',
      `/conversation/v2/`,
      body
    );
    return response;
  }
  /**
   * Delete a Conversation
   */
  async delete(conversation_id) {
    await Request_manager.send(
      'admin',
      'POST',
      `/conversation/${conversation_id}/leave`,
      {}
    );
  }

  async markUnread(conversation_id) {
    await Request_manager.send(
      'admin',
      'DELETE',
      `/conversation/${conversation_id}/read`,
      {}
    );
  }

  async markStar(conversation_id) {
    await Request_manager.send(
      'admin',
      'POST',
      `/conversation/${conversation_id}/star`,
      {}
    );
  }
  async generateOneContact() {
    const response = await Request_manager.send('admin', 'GET', `/contact`, {});
    const jsonGenerated = [
      { type: response.data[0].type, id: response.data[0].user_id },
    ];
    return jsonGenerated;
  }

  async generateContacts() {
    const response = await Request_manager.send('admin', 'GET', `/contact`, {});
    const jsonGenerated = [];
    response.data.forEach((element) => {
      jsonGenerated.push({ type: element.type, id: element.user_id });
    });
    return jsonGenerated;
  }
}

module.exports = new ConversationApi();
