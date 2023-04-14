/**
 * POM Abstractions for Delete task Modal
 */
const { By } = require('selenium-webdriver');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const labelInTaskPodio = require('../../../main/ui/task/label_ui');
/**
 * Page Model for Delete Task Modal
 */
class DeleteModal {
  deleteModal = By.css('div[class="modal-wrapper modal-confirm"]');
  confirmDeleteButton = By.className('button-new primary confirm-button');

  /**
   * Delete a task in new Page or in the task Page
   * @param icon
   */
  async deleteTask(icon) {
    const displayModal = await conditions.untilLocated(icon);
    await actions.hoverMouse(displayModal);
    await conditions.untilVisible(this.deleteModal);
    await conditions.untilLocated(this.confirmDeleteButton);
    await actions.clickOn(this.confirmDeleteButton);
  }

  /**
   * Delete a Label
   */
  async deleteLabel() {
    const displayIcon = await conditions.untilLocated(
      labelInTaskPodio.labelDeleteDiv
    );
    const displayDelete = await actions.driver.findElement(
      labelInTaskPodio.deleteLabelIcon
    );
    await actions.driver
      .actions()
      .move({ duration: 1000, origin: displayIcon })
      .move({ duration: 2000, origin: displayDelete })
      .click()
      .perform();

    await conditions.untilLocated(this.deleteModal);
    await conditions.untilLocated(this.confirmDeleteButton);
    await actions.clickOn(this.confirmDeleteButton);
  }
}

const deleteModalPodio = new DeleteModal();
module.exports = deleteModalPodio;
