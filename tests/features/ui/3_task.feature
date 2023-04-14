@gui @task
Feature: tasks

    Defines test scenarios for Task feature

    Background: Login into Podio
        When the user login into PODIO with "admin" role
        Then the URL to be redirect should be "https://podio.com/home"
        And the Home page components should be loaded

    @TA-01 @functional @smoke @deleteTaskByAPI
    Scenario: A user can create a Task (TA-01) 
        When the user selects the Task Page
        And the user sets the task name "Task-TA-01"
        And the user completes the creation with the following data
            | description   | Test #1   |
            | due_time      | 08:00     |
        Then the page should display the task created

    @TA-02 @functional @createTaskByAPI @deleteTaskByAPI
    Scenario: A user can see a specific Task by Calendar Page (TA-02) 
        When the user selects the Calendar Page
        Then the page should display the specific Task "Task Hook - UI" in calendar
        And new page is open with "Tasks | Task Hook - UI" title

    @TA-03 @functional @smoke @createTaskByAPI @deleteTaskByAPI
    Scenario: A user can see details of a task on the Task Page (TA-03) 
        When the user selects the Task Page
        Then the page should display the following task data
            | name          | Task Hook - UI        |
            | description   | Description-Task - UI |
            | due_time      | 10:00                 |
    
    @TA-04 @functional @createTaskByAPI @deleteTaskByAPI
    Scenario: A user can update task assignment (TA-04) 
        When the user accesses a specific task via the Calendar Page
        And the user updates the assigned user to "contactOne"
        Then the page should display the task delegated to "contactOne" 

    @TA-05 @functional @smoke @createTaskByAPI @deleteTaskByAPI
    Scenario: A user can update data the a task in Task Page (TA-05) 
        When the user selects the Task Page
        And the user displays the task data "Task Hook - UI"
        And the user updates the following data
            | name          | New Title - UI        |
            | description   | New Description - UI  |
            | due_time      | 11:00                 |
        Then the page should display the task with the updated data

    @TA-06 @functional @createTaskByAPI @bug
    Scenario: A user can delete a task through Calendar Page (TA-06) 
        When the user accesses a specific task via the Calendar Page
        And the user deletes task from new page
        Then the task should be removed of the calendar Page

    @TA-07 @functional @smoke @createTaskByAPI
    Scenario: A user can delete a task in the Task Page (TA-07) 
        When the user selects the Task Page
        And the user deletes the task created
        Then the task should be removed from the same page
    
    @TA-08 @negative
    Scenario: A user cannot create a Task with a name with blank characters (TA-08) 
        When the user selects the Task Page
        And the user sets the task name "     "
        And the user completes the creation with the following data
            | description   | Test #1   |
            | due_time      | 08:00     |
        Then the page should not allow to create a task

    @TA-09 @negative @deleteTaskByAPI @bug
    Scenario: A user cannot create a Task with a past date (TA-09) 
        When the user selects the Task Page
        And the user sets the task name "Task - Negative"
        And the user selects a past date
        And the user tries to create the task
        Then the page should not display any just added tasks

    @TA-10 @negative @createTaskByAPI @deleteTaskByAPI
    Scenario: A user cannot update name task with blank characters (TA-10) 
        When the user selects the Task Page
        And the user updates name task to "     "
        Then the task should not allow saving the blank name
    
    @TA-11 @functional @smoke @deleteLabelByAPI
    Scenario: A user can create a label in the task Page (TA-11) 
        When the user selects the Task Page
        And the user sets the label name as "DevOps"
        And the user selects a color
        Then the section should display the label created

    @TA-12 @functional @smoke @createLabelByAPI @deleteLabelByAPI
    Scenario: A user can see a label created in the task Page (TA-12)
        When the user selects the Task Page
        Then the page should display the label created
    
    @TA-13 @functional @smoke @createLabelByAPI
    Scenario: A user can delete a label in the Task Page (TA-13) 
        When the user selects the Task Page
        And the user deletes the label created
        Then the label should be removed of the page
    
    @TA-14 @negative
    Scenario: A user cannot create a Label with a name with blank characters (TA-14) 
        When the user selects the Task Page
        And the user sets the label name as "     "
        Then the page should not display any label created

    @TA-15 @functional @E2E
    Scenario: A user can create, update, assign and delete a task with a label (TA-15)
        Given the user sets the following data:
            | nameTask          | SPA                      |
            | time              | 10:00                    |
            | description       | Concepts                 |
            | userAssigned      | contactOne               |
            | newName           | SPA vs MPA               |
            | newTime           | 11:00                    |
            | newDescription    | Concepts and differences |
            | nameLabel         | GUI Testing              |
        When the user selects the Task Page
        And the user creates a task
        And the user sees and edits some data of the task
        And the user creates a label for task
        And the user assigns a label to the task
        And the user assigns a task to a Contact
        And the user deletes the task assigned
        And the user deletes the label created
        Then the page should remove the task from the My delegated tasks
        And the label should be removed of the page