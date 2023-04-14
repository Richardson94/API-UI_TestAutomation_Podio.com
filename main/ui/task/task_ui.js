/**
 * POM Abstractions for Tasks Page
 */
const { By } = require('selenium-webdriver');
const actions = require('../../../core/utils/actions');
const conditions = require('../../../core/utils/conditions');
const headerPodio = require('../Common/header_ui');
const deleteModalPodio = require('../task/deleteModal_ui');
/**
 * Page Model for Tasks Page
 */
class TaskPodio {
  myTaskDelegatedTab = By.css('a[href*="delegated"] h5');
  userDelegatedLabel = By.css('div[id="js-task-list"] h5 div[class="bd"]');
  nameTaskInput = By.id('task_text');
  taskEmptyLabel = By.css('div[class="task-list"] h2');
  validForm = By.css('div[class=""] [class="input-field-container"]');
  calendarDropdown = By.className('podio-dropdown-icon icon-calendar');
  dueDateTomorrowInput = By.css(
    'label[for="podiodropdown-due_date_select-i2"]'
  );
  dueTimeInput = By.id('task_due_time');
  descriptionInput = By.id('task_description');
  createTaskButton = By.id('task_submit');
  taskNameCreated = By.css('#tasks_just_added div input + a.task-link');
  taskIDCreated = By.css('div[id="tasks_just_added"] li');
  taskGroup = By.css(
    'div[class*="single-task js-rank-task"] div[class="image-block"]'
  );
  taskGrouphidden = By.css(
    'ul[class*="task-group-list"] li[style="display: none;"]'
  );
  taskNameLabel = By.css('a[class="task-link edit-task-title"]');
  taskTitleLabel = By.className('grid-row-3 image-block');
  taskDescriptionLabel = By.css('div[class*="edit-task-description"]');
  taskTimeLabel = By.css('span.due-date div.time');
  taskDateLabel = By.css('span.due-date div.date');
  clickOutDiv = By.css('div[class*="attached"] div[class*="button-wrapper"]');
  taskNameInput = By.css('div[class="task-summary"] input');
  taskDescriptionTagP = By.css('div[class="edit-task-description markdown"] p');
  taskDescriptionTextarea = By.css('textarea[class*="edit-task-description"]');
  editDueDateSpan = By.css('span[class="due-date edit-due-date"]');
  dueDateTimeInput = By.css('span input[id="due_date_time"]');
  taskTimeDiv = By.css('div[class="time"]');
  deleteTaskInTaskPageIcon = By.css('a[class*="delete-task tooltip"]');
  errorCreateMessage = By.className('error-failed');
  customDateInput = By.xpath(
    '//input[@value="custom-date"]/following-sibling::label'
  );
  datePicker = By.id('ui-datepicker-div');
  datePast = By.xpath(
    '//td[@class=" ui-datepicker-days-cell-over  ui-datepicker-today"]/preceding-sibling::td[1]'
  );
  assignLabelDiv = By.css(
    'div[class*="task-right-column"] div[class="bd label-list"]'
  );
  labelSelect = By.css('div[class="podio-autocompleter"] span[class="value"]');

  /**
   * Set name Task
   */
  async setTitleTask(nameTask) {
    const nameElement = await actions.getWebElement(this.nameTaskInput);
    await actions.driver
      .actions()
      .click(nameElement)
      .pause(1000)
      .sendKeys(nameTask)
      .perform();
    await actions.setText(this.nameTaskInput, nameTask);
    return await conditions.isVisible(this.validForm);
  }

  /**
   * Create a Task
   */
  async create(description, time) {
    await actions.clickOn(this.calendarDropdown);
    await actions.clickOn(this.dueDateTomorrowInput);
    await actions.setText(this.dueTimeInput, time);
    await actions.setText(this.descriptionInput, description);
    await actions.clickOn(this.createTaskButton);
  }

  /**
   * Get ID of the new Task
   */
  async getIDJustCreated() {
    let result = await actions.getAttributeValue(
      this.taskIDCreated,
      'data-task-id'
    );
    result = parseInt(result);
    return result;
  }

  /**
   * Display details of a task in task Page
   */
  async detailTaskInTaskPage() {
    const displayTask = await conditions.untilLocated(this.taskGroup);
    await actions.hoverMouse(displayTask);
    await conditions.untilLocated(this.taskDescriptionLabel);
    await conditions.untilVisible(this.taskTimeLabel);
    await conditions.untilVisible(this.taskDateLabel);
  }

  /**
   * Verify user assigned in 'My delegated tasks' Tab
   */
  async verifyUserAssigned() {
    await actions.clickOn(headerPodio.taskIcon);
    await conditions.untilTitleIs('My tasks | Podio');
    await actions.clickOn(this.myTaskDelegatedTab);
    await conditions.untilTitleIs('My delegated tasks | Podio');
    return await actions.getText(this.userDelegatedLabel);
  }

  /**
   * Update name task in Task Page
   * @param name
   */
  async updateName(name) {
    const nameElement = await actions.getWebElement(this.taskNameLabel);
    await actions.driver.actions().click(nameElement).pause(1000).perform();
    await actions.fillFieldPlusEnter(this.taskNameInput, name);
    await actions.clickOn(this.taskTitleLabel);
  }

  /**
   * Update data task in Task Page
   * @param name
   * @param description
   * @param time
   */
  async updateDataInTaskPage(name, description, time) {
    await this.detailTaskInTaskPage();
    // update name/title
    const nameElement = await actions.getWebElement(this.taskNameLabel);
    await actions.driver.actions().click(nameElement).pause(1000).perform();
    await actions.clickOn(this.taskNameLabel);
    await actions.fillFieldPlusEnter(this.taskNameInput, name);
    await actions.clickOn(this.taskTitleLabel);
    // update description
    const descriptionElement = await actions.driver.findElement(
      this.taskDescriptionTagP
    );
    await actions.driver
      .actions()
      .click(descriptionElement)
      .pause(1000)
      .perform();
    await actions.clickOn(this.taskDescriptionTextarea);
    await actions.fillFieldPlusTab(this.taskDescriptionTextarea, description);
    await actions.clickOn(this.clickOutDiv);
    // update time
    const timeElement = await actions.getWebElement(this.editDueDateSpan);
    await actions.hoverMouse(timeElement);
    await actions.clickOn(this.dueDateTimeInput);
    await actions.setText(this.dueDateTimeInput, time);
    await actions.clickOn(this.clickOutDiv);
  }

  /**
   * Selects a past date
   */
  async pastDate() {
    await actions.clickOn(this.calendarDropdown);
    await actions.clickOn(this.customDateInput);
    await conditions.untilVisible(this.datePicker);
    await actions.clickOn(this.datePast);
  }

  /**
   * Assign a label to a task
   */
  async assignLabel() {
    await actions.clickOn(this.assignLabelDiv);
    await actions.clickOn(this.labelSelect);
    await actions.clickOn(this.taskGroup);
  }

  /**
   * Selects a past date
   */
  async deleteTaskDelegated() {
    await actions.clickOn(headerPodio.taskIcon);
    await conditions.untilTitleIs('My tasks | Podio');
    await actions.clickOn(this.myTaskDelegatedTab);
    await conditions.untilTitleIs('My delegated tasks | Podio');
    await deleteModalPodio.deleteTask(this.deleteTaskInTaskPageIcon);
  }
}

const taskPodio = new TaskPodio();
module.exports = taskPodio;
