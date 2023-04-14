const { expect } = require('expect');
const { When, Then } = require('@cucumber/cucumber');
const organizationGui = require('../../../../main/ui/organization/organization_ui');
const settingsOrganization = require('../../../../main/ui/organization/settingsOrganization_ui');
const conditions = require('../../../../core/utils/conditions');
const modalCreateOrganizationPodio = require('./../../../../main/ui/organization/createOrganizationModal_ui');
const deleteCreateOrganizationPodio = require('./../../../../main/ui/organization/deleteOrganizationModal_ui');
const sidebar = require('./../../../../main/ui/Common/sideBar_ui');

When('the user creates a new organization with', async (dataTable) => {
  await organizationGui.createNewOrganization(dataTable.rowsHash().name);
});

Then('page should redirects to {string}', async (responseUrl) => {
  const response = await conditions.untilUrlLoaded(responseUrl);
  expect(true).toEqual(response);
});

Then(
  'it should display containers with the following data',
  async (dataTable) => {
    const data = dataTable.rowsHash();
    const responseData = await organizationGui.listLabelsContainers();
    expect(data.employee).toBe(responseData.employee);
    expect(data.organization).toBe(responseData.nameOrganization);
    expect(data.activity).toBe(responseData.activity);
    expect(data.tasks).toBe(responseData.tasks);
    expect(data.files).toBe(responseData.file);
  }
);

When('the user creates organizations with', async (listNameOrganizations) => {
  this.listNameOrganizations = listNameOrganizations.hashes();
  await organizationGui.createListOrganizations(this.listNameOrganizations);
});

Then('this list should be displayed in the "Workspace" sidebar', async () => {
  const listOrganization = await organizationGui.listOrganizations();
  this.listNameOrganizations.forEach(organization => {
    expect(listOrganization).toContain(organization.name);
  });
});

When('the user deletes this organization with the word {string}', async (textForLeaveOrganization) => {
  await organizationGui.deleteOrganization(textForLeaveOrganization);
});

Then('this organization should not be displayed', async () => {
  const listOrganization = await organizationGui.listOrganizations();
  this.listNameOrganizations.forEach(organization => {
    expect(listOrganization).not.toContain(organization.name);
  });
});

When('changes the name of his organization to {string}', async (newName) => {
  this.newOrganization = newName;
  await organizationGui.updateOrganization(this.newOrganization);
});

Then('in the organization settings, it should show the name change', async () => {
  const nameLabelEdit = await settingsOrganization.getNameOrganizationLabelSettings();
  expect(nameLabelEdit.split(" ")[0]). toBe(this.newOrganization);
});

Then('the change should also display in the list of organizations', async () => {
  const listOrganization = await organizationGui.listOrganizations();
  expect(listOrganization).toContain(this.newOrganization);
});

When('the user enters the create new organization option', async () => {
  await organizationGui.goToCreateNewOrganization();
});

When('click on the create button without filling in any required fields', async () => {
  await modalCreateOrganizationPodio.clickCreateOrganizationButton();
});

Then('a validation is displayed in each required field', async () => {
  const isValidateAllFields = await modalCreateOrganizationPodio.verifyValidationAllRequiredFields();
  expect(isValidateAllFields).toBeTruthy();
});

When('the user enters the configuration of an organization', async () => {
  await organizationGui.goToSettingOrganization();
});

Then('the user should not be able to update the organization with an empty name field', async () => {
  expect(await settingsOrganization.verifyValidationNameField()).toBeTruthy();
});

When('the user enters the "Leave organization" option of an organization', async () => {
  await organizationGui.goToLeaveOrganization();
});

Then('the user should not be able to delete an organization with', async (dataList) => {
  const data = dataList.hashes();

  await Promise.all(
    data.map(async (textForDelete) => {
      let isValidate = await deleteCreateOrganizationPodio.verifyValidateLeaveOrganizationModal(textForDelete.wordDelete);
      await deleteCreateOrganizationPodio.cleanFieldLeaveOrganization();
      expect(isValidate).toBeTruthy();
    })
  );
  await deleteCreateOrganizationPodio.closeLeaveOrganizationModal();
});
  
When('the user enters the option leave organization from {string}', async (optionLeaveOrganization) => {
    let option = optionLeaveOrganization === "sidebar"?false:true;
    await organizationGui.goToLeaveOrganization(option);
});



