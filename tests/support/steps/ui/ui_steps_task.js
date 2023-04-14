/**
 * Tasks steps
 */
const { expect } = require('expect');
const { Given, When, Then } = require('@cucumber/cucumber');
const actions = require('../../../../core/utils/actions');
const taskPodio = require('../../../../main/ui/task/task_ui');
const calendarPodio = require('../../../../main/ui/task/calendar_ui');
const taskSpecificPodio = require('../../../../main/ui/task/taskSpecific_ui');
const deleteModalPodio = require('../../../../main/ui/task/deleteModal_ui');
const headerPodio = require('../../../../main/ui/Common/header_ui');
const labelInTaskPodio = require('../../../../main/ui/task/label_ui');
const conditions = require('../../../../core/utils/conditions');
const configurationManager = require('../../../../core/utils/configuration_manager');

When('the user selects the Task Page', async () => {
  await actions.clickOn(headerPodio.taskIcon);
  await conditions.untilTitleIs('My tasks | Podio');
});

When('the user selects the Calendar Page', async () => {
  await actions.clickOn(headerPodio.calendarIcon);
  await conditions.untilTitleIs('Calendar | Podio');
  await actions.clickOn(calendarPodio.monthButton);
});

When('the user sets the task name {string}', async function (nameTask) {
  this.taskName = nameTask;
  const value = await taskPodio.setTitleTask(this.taskName);
  expect(value).toBe(true);
});

When(
  'the user completes the creation with the following data',
  async function (dataTable) {
    this.taskData = dataTable.rowsHash();
    await taskPodio.create(this.taskData.description, this.taskData.due_time);
  }
);

Then('the page should display the task created', async function () {
  this.taskID = await taskPodio.getIDJustCreated();
  const nameTaskCreated = await actions.getText(taskPodio.taskNameCreated);
  expect(this.taskName).toEqual(nameTaskCreated);
});

Then(
  'the page should display the specific Task {string} in calendar',
  async (nameTask) => {
    const value = await calendarPodio.getTaskInCalendar(nameTask);
    expect(value).toBe(true);
  }
);

Then('new page is open with {string} title', async (nameTaskPage) => {
  const value = await calendarPodio.openTaskPage(nameTaskPage);
  expect(value).toBe(true);
  const result = await taskSpecificPodio.closeTaskPage();
  expect(result).toEqual(1);
});

Then(
  'the page should display the following task data',
  async function (dataTable) {
    this.taskData = dataTable.rowsHash();
    await taskPodio.detailTaskInTaskPage();
    const nameTask = await actions.getText(taskPodio.taskNameLabel);
    const descriptionTask = await actions.getText(
      taskPodio.taskDescriptionLabel
    );
    const timeTask = await actions.getText(taskPodio.taskTimeLabel);
    expect(nameTask).toEqual(this.taskData.name);
    expect(descriptionTask).toEqual(this.taskData.description);
    expect(timeTask.substr(0, 5)).toEqual(this.taskData.due_time);
  }
);

When(
  'the user accesses a specific task via the Calendar Page',
  async function () {
    await calendarPodio.accessNewTaskPage(this.task.data.text);
  }
);

When('the user updates the assigned user to {string}', async (newUser) => {
  await taskSpecificPodio.updateAssignedUserInNewTaskPage(newUser);
});

Then(
  'the page should display the task delegated to {string}',
  async (newUser) => {
    await taskSpecificPodio.closeTaskPage();
    const result = await taskPodio.verifyUserAssigned();
    expect(configurationManager.environment.contacts[newUser].name).toEqual(
      result
    );
  }
);

When('the user displays the task data {string}', async (nameTask) => {
  await taskPodio.detailTaskInTaskPage();
  const taskName = await actions.getText(taskPodio.taskNameLabel);
  expect(taskName).toEqual(nameTask);
});

When('the user updates the following data', async function (dataTable) {
  this.taskData = dataTable.rowsHash();
  await taskPodio.updateDataInTaskPage(
    this.taskData.name,
    this.taskData.description,
    this.taskData.due_time
  );
});

Then(
  'the page should display the task with the updated data',
  async function () {
    const newName = await actions.getText(taskPodio.taskNameLabel);
    expect(newName).toEqual(this.taskData.name);
    const newDescription = await actions.getText(taskPodio.taskDescriptionTagP);
    expect(newDescription).toEqual(this.taskData.description);
    const newTime = await actions.getText(taskPodio.taskTimeDiv);
    expect(newTime.substr(0, 5)).toEqual(this.taskData.due_time);
  }
);

When('the user deletes task from new page', async () => {
  await deleteModalPodio.deleteTask(taskSpecificPodio.deleteTaskInNewPageIcon);
});

Then('the task should be removed of the calendar Page', async () => {
  await taskSpecificPodio.closeTaskPage();
  await conditions.untilTitleIs('Calendar | Podio');
  const result = await conditions.isVisible(calendarPodio.taskCalendar);
  expect(result).toBe(false);
});

When('the user deletes the task created', async () => {
  await deleteModalPodio.deleteTask(taskPodio.deleteTaskInTaskPageIcon);
});

Then('the task should be removed from the same page', async () => {
  const result = await conditions.isNotVisible(taskPodio.taskGroup);
  expect(result).toBe(true);
});

Then('the page should not allow to create a task', async () => {
  await conditions.untilLocated(taskPodio.errorCreateMessage);
  const result = await actions.getText(taskPodio.errorCreateMessage);
  expect(result).toEqual('An unexpected error occurred');
});

When('the user selects a past date', async () => {
  await taskPodio.pastDate();
});

When('the user tries to create the task', async function () {
  await actions.clickOn(taskPodio.createTaskButton);
});

Then('the page should not display any just added tasks', async function () {
  this.taskID = await taskPodio.getIDJustCreated();
  const result = await conditions.isVisible(taskPodio.taskEmptyLabel);
  expect(result).toBe(true);
});

When('the user updates name task to {string}', async function (nameTask) {
  this.taskName = nameTask;
  await taskPodio.detailTaskInTaskPage();
  await taskPodio.updateName(nameTask);
});

Then('the task should not allow saving the blank name', async function () {
  const result = await actions.getText(taskPodio.taskNameLabel);
  expect(result).not.toEqual(this.taskName);
});

When('the user sets the label name as {string}', async function (labelName) {
  this.labelName = labelName;
  await labelInTaskPodio.create(this.labelName);
});

When('the user selects a color', async function () {
  await labelInTaskPodio.selectColor();
});

Then('the section should display the label created', async function () {
  this.labelID = await labelInTaskPodio.getIDLabel();
  const result = await actions.getText(labelInTaskPodio.labelCreatedLabel);
  expect(result).toEqual(this.labelName);
});

Then('the page should display the label created', async function () {
  await conditions.untilLocated(labelInTaskPodio.labelValidate);
  const result = await actions.getText(labelInTaskPodio.labelCreatedLabel);
  expect(result).toEqual('API testing');
});

When('the user deletes the label created', async function () {
  await deleteModalPodio.deleteLabel();
});

Then('the label should be removed of the page', async function () {
  const result = await conditions.isNotVisible(labelInTaskPodio.labelValidate);
  expect(result).toBe(true);
});

Given('the user sets the following data:', function (dataTable) {
  this.taskData = dataTable.rowsHash();
});

When('the user creates a task', async function () {
  await taskPodio.setTitleTask(this.taskData.nameTask);
  await taskPodio.create(this.taskData.description, this.taskData.time);
});

When('the user sees and edits some data of the task', async function () {
  await taskPodio.detailTaskInTaskPage();
  await taskPodio.updateDataInTaskPage(
    this.taskData.newName,
    this.taskData.newDescription,
    this.taskData.newTime
  );
});

When('the user creates a label for task', async function () {
  await labelInTaskPodio.createLabel(this.taskData.nameLabel);
  await labelInTaskPodio.selectColor();
});

When('the user assigns a label to the task', async function () {
  await taskPodio.assignLabel();
});

When('the user assigns a task to a Contact', async function () {
  await calendarPodio.accessNewTaskPage(this.taskData.newName);
  await taskSpecificPodio.updateAssignedUserInNewTaskPage(
    this.taskData.userAssigned
  );
});

When('the user deletes the task assigned', async function () {
  await taskSpecificPodio.closeTaskPage();
  await taskPodio.deleteTaskDelegated();
});

Then(
  'the page should remove the task from the My delegated tasks',
  async function () {
    const result = await conditions.isNotVisible(taskPodio.taskGrouphidden);
    expect(result).toBe(true);
  }
);

Then('the page should not display any label created', async function () {
  const result = await conditions.isVisible(labelInTaskPodio.labelIDCreated);
  expect(result).toBe(false);
});
