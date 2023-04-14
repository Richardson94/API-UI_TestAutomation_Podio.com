@gui @organizationGUI 
Feature: Organization

    Defines scenarios about Organization feature

    Background: Login to PODIO page
        When the user login into PODIO with "admin" role
        Then the URL to be redirect should be "https://podio.com/home"
        And the Home page components should be loaded

    @OR-01 @functional 
    Scenario: A user can create an organization on PODIO page [OR-01]
        When the user creates a new organization with
            | name | mar010 |
        Then the page title should be "mar010 Employee Network"
        And it should display containers with the following data
            | employee     | Employees 1              | 
            | organization | mar010                   |
            | activity     | No activity yet...       |
            | tasks        | Employee Network Tasks 0 |
            | files        | Employee Network Files 0 |
    
    @OR-02 @functional @deleteOrganization
    Scenario: A user can get the list of of created organizations on the PODIO page [OR-02]
        When the user creates organizations with
            | name   |
            | org001 |
        Then this list should be displayed in the "Workspace" sidebar
    
    @OR-03 @functional   
    Scenario: A user should be able to delete the organization created on the PODIO page [OR-03]
        When the user creates organizations with
            | name   |
            | org001 |
        And the user enters the option leave organization from "sidebar"
        Then the user deletes this organization with the word "leave"
        And this organization should not be displayed

    @OR-04 @functional @deleteOrganization 
    Scenario: A user should be able to update the organization created on the PODIO page [OR-04]
        When the user creates organizations with
            | name   |
            | org001 |
        And changes the name of his organization to "nameOrgUpdate"
        Then in the organization settings, it should show the name change
        And the change should also display in the list of organizations
    
    @OR-05 @negative 
    Scenario: Verify that the user cannot create an organization without data in the required fields [OR-05]
        When the user enters the create new organization option
        And click on the create button without filling in any required fields
        Then a validation is displayed in each required field

    @OR-06 @negative @deleteOrganization  
    Scenario: Verify that the user cannot update the name of an organization with empty data [OR-06]
        When the user creates organizations with
            | name   |
            | org001 |
        And the user enters the configuration of an organization
        Then the user should not be able to update the organization with an empty name field

    @OR-07 @negative @deleteOrganization 
    Scenario: Verify that the user is not able to delete an organization with invalid text [OR-07]
        When the user creates organizations with
            | name   |
            | org001 |
        And the user enters the "Leave organization" option of an organization
        Then the user should not be able to delete an organization with 
            | wordDelete |
            |  LEAVE     |
            |  pdfsdfs   |

    @OR-08 @functional @deleteOrganization 
    Scenario: Verify that a user can delete the organization through the configuration option page [OR-08]
        When the user creates organizations with
            | name   |
            | org001 |        
        And the user enters the option leave organization from "settings"
        Then the user deletes this organization with the word "leave"
        And this organization should not be displayed


