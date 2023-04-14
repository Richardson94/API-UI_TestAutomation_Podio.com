/**
 * POM Abstractions for Calendar Page
 */
const { By } = require('selenium-webdriver');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const headerPodio = require('../Common/header_ui');
/**
 * Page Model for Calendar Page
 */
class CalendarPodio {
  monthButton = By.css('a[data-value="month"]');
  taskCalendar = By.css('td span.fc-title');
  goToTaskButton = By.css('.balloon-content a.button-new');

  /**
   * Get a task specific by calendar
   * @param nameTask
   */
  async getTaskInCalendar(nameTask) {
    const displayModal = await conditions.untilLocated(
      By.css(`a[data-tooltip-template-data*="${nameTask}"]`)
    );
    await actions.hoverMouse(displayModal);
    return await conditions.isVisible(this.goToTaskButton);
  }

  /**
   * Open a specific task page
   * @param titlePage
   */
  async openTaskPage(titlePage) {
    await actions.switchToNew(this.goToTaskButton);
    return await conditions.untilTitleIs(titlePage);
  }

  /**
   * Go to the specific task Page
   * @param nameTask
   */
  async accessNewTaskPage(nameTask) {
    await actions.clickOn(headerPodio.calendarIcon);
    await actions.clickOn(this.monthButton);
    await conditions.untilTitleIs('Calendar | Podio');
    await this.getTaskInCalendar(nameTask);
    await this.openTaskPage(`Tasks | ${nameTask}`);
  }
}

const calendarPodio = new CalendarPodio();
module.exports = calendarPodio;
