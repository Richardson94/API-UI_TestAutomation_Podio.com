@gui @space
Feature: Spaces

    Define scenarios for test Spaces

    Background: Login
        When the user login into PODIO with "admin" role
        Then the URL to be redirect should be "https://podio.com/home"
        And the Home page components should be loaded

    @SP-01 @functional @smoke @deleteSpace
    Scenario: Verify that the user can create a new Space [SP-01]
        When the user make click on Side Bar Menu Button
        Then the user can see the Create a new Workspace icon
        And the user should can create a new workspace called "testWorkspace"
    
    @SP-02 @negative
    Scenario: Verify that the user cannot create a new Space with the "Workspace Name" in blank [SP-02]
        When the user make click on Side Bar Menu Button
        Then the user can see the Create a new Workspace icon
        And the user should can create a new workspace with Workspace Name in Blank
    
    @SP-03 @functional @smoke
    Scenario: Verify that the user can get all Workspaces [SP-03]
        When the user make click on Side Bar Menu Button
        Then the user can see all workspaces for a default Organization

    @SP-04 @functional @smoke @createSpace @deleteSpace
    Scenario: Verify that the user can update the name of Workspaces [SP-04]
        When the user make click on Side Bar Menu Button
        Then the user should be able to update a workspace to "updateWorkspace"

    @SP-05 @functional @smoke @createSpace
    Scenario: Verify that the user can delete Workspaces [SP-05]
        When the user make click on Side Bar Menu Button
        And the user select a workspace for apply the action
        Then the user can delete the workspace


    @SP-06 @negative @createSpace @deleteSpace
    Scenario: Verify that the user cannot update a Workspace when the "Workspace Name" field is in blank [SP-06]
        When the user make click on Side Bar Menu Button
        Then the user should not be able to update a workspace to empty

    @SP-07 @negative @createSpace @deleteSpace
    Scenario: Verify that the user cannot delete Workspaces with incorrect word for confirm that [SP-07]
        When the user make click on Side Bar Menu Button
        And the user select a workspace for apply the action
        Then the user should not be able to delete a workspace with "incorrect" word for confirm that and return this message:
                | message | The text does not match. |

    @SP-08 @negative @createSpace @deleteSpace
    Scenario: Verify that the user cannot delete Workspaces with field in black in confirm delete [SP - 08]
        When the user make click on Side Bar Menu Button
        And the user select a workspace for apply the action
        Then the user should not be able to delete a workspace with " " word for confirm that and return this message:
                | message | This field is required. |

    @SP-09 @functional @createSpace
    Scenario: Verify that the user can archive a Workspaces [SP-09]
        When the user make click on Side Bar Menu Button
        Then the user can see all workspaces for a default Organization
        And the user should be able archive a workspace

    @SP-10 @functional @deleteSpace
    Scenario: Verify that the user can unarchive a Workspaces [SP-10]
        When the user make click on Side Bar Menu Button
        Then the user can see all workspaces for a default Organization
        And the user should be able unarchive a workspace

    @SP-11 @negative @createSpace @deleteSpace
    Scenario: Verify that the user cannot archive a Workspaces when click on "cancel" button [SP-11]
        When the user make click on Side Bar Menu Button
        Then the user can see all workspaces for a default Organization
        And the user should not be able archive a workspace if he cancel the action

    @SP-12 @negative @createSpace @deleteSpace
    Scenario: Verify that the user cannot unarchive a Workspaces when click on "Cancel" Button [SP-12]
        When the user make click on Side Bar Menu Button
        Then the user can see all workspaces for a default Organization
        And the user should not be able unarchive a workspace if cancel the action

    @SP-13 @functional @E2E @doActionSideMenu
    Scenario: Verify that the user can apply the complete CRUD in Workspace [SP-13]
        When the user make click on Side Bar Menu Button
        Then the user can see the Create a new Workspace icon
        And the user should can create a new workspace called "testWorkspace"
        And the user should be able to update a workspace to "updateWorkspace"
        And the user should be able archive a workspace
        And the user should be able unarchive a workspace
        And the user can delete the workspace

              
