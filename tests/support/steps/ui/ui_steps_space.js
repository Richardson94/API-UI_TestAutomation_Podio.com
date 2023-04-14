const { expect } = require('expect');
const { When, Then } = require('@cucumber/cucumber');
const spacePodio = require('../../../../main/ui/space/space_ui');
const sideBarPodio = require('../../../../main/ui/Common/sideBar_ui');
const createSpaceModal = require('../../../../main/ui/space/createSpaceModal_ui');
const editSpace = require('../../../../main/ui/space/editSpace_ui');
const deleteSpaceModal = require('../../../../main/ui/space/deleteSpaceModal_ui');

When('the user make click on Side Bar Menu Button', async () => {
  const response = await sideBarPodio.verifySideMenu();
  expect(true).toEqual(response);
});

Then('the user can see the Create a new Workspace icon', async () => {
  const response = await spacePodio.openCreateWorkspace();
  expect(true).toEqual(response);
});

When(
  'the user should can create a new workspace called {string}',
  async (nameSpace) => {
    const response = await createSpaceModal.createWorkspace(nameSpace);
    expect(true).toEqual(response);
  }
);

When('the user can see all workspaces for a default Organization', async () => {
  const response = await spacePodio.viewWorkspaces();
  expect(true).toEqual(response);
});

When(
  'the user should be able to update a workspace to {string}',
  async (newName) => {
    const response = await editSpace.updateWorkspaces(newName);
    expect(true).toEqual(response);
  }
);

When(
  'the user should can create a new workspace with Workspace Name in Blank',
  async () => {
    const response = await createSpaceModal.createWorkspaceBlank();
    expect('Workspace name is required ').toEqual(response);
  }
);

When('the user should not be able to update a workspace to empty', async () => {
  const response = await editSpace.updateWorkspaceBlank();
  expect('This field is required.').toEqual(response);
});

When('the user select a workspace for apply the action', async () => {
  const response = await spacePodio.selectWorkspace();
  expect(false).toEqual(response);
});

Then(
  'the user should not be able to delete a workspace with {string} word for confirm that and return this message:',
  async (wordIncorrect, dataTable) => {
    const message = dataTable.rowsHash();
    const response = await deleteSpaceModal.negativeDelete(wordIncorrect);
    expect(message.message).toEqual(response);
  }
);

Then('the user can delete the workspace', async () => {
  const response = await deleteSpaceModal.deleteWorkspace();
  expect(false).toEqual(response);
});

When('the user should be able archive a workspace', async () => {
  const response = await spacePodio.archiveWorkspace(true);
  expect(false).toEqual(response);
});

When('the user should be able unarchive a workspace', async () => {
  const response = await spacePodio.unarchiveWorkspace(true);
  expect(true).toEqual(response);
});

When(
  'the user should not be able archive a workspace if he cancel the action',
  async () => {
    const response = await spacePodio.archiveWorkspace(false);
    expect(true).toEqual(response);
  }
);

When(
  'the user should not be able unarchive a workspace if cancel the action',
  async () => {
    await spacePodio.archiveWorkspace(true);
    const response = await spacePodio.unarchiveWorkspace(false);
    expect(true).toEqual(response);
  }
);
