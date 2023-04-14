@api    @task
Feature: Tasks

    Defines scenarios for Tasks feature

    @TA-01 @smoke @functional @deleteTask
    Scenario: A user can create a Task (TA-01)
        Given the user sets the following body:
            | text          | tit-Task              |
            | description   | Desc task1            |
            | due_date      | 2022-11-10            |
            | due_time      | 19:00:00              |
        When the "admin" user sends a "POST" request to "/task/" endpoint
        Then the response status code should be 200
        And the response body should have the following values TA-01:
            | text			| tit-Task	     		|
        And the schema response is the same with "taskSchema"

    @TA-02 @smoke @functional @createTask @deleteTask
    Scenario: A user can get a Task specific (TA-02)
        When the "admin" user sends a "GET" request to "/task/(task.data.task_id)" endpoint
        Then the response status code should be 200
        And the response body should have the following values TA-02:
            | description      | Description-Task        |
        And the schema response is the same with "taskSchema"

    @TA-03 @functional
    Scenario: A user can get the total of Task - summary (TA-03)
        When the "admin" user sends a "GET" request to "/task/total" endpoint
        Then the response status code should be 200
        And the response body should have the following values TA-03:
            | own      | {"completed_yesterday": 0, "upcoming": 0, "later":0}   |
        And the schema response is the same with "taskSummarySchema"

    @TA-04 @smoke @functional @createTask @deleteTask
    Scenario: A user can edit a task title (TA-04)
        Given the user sets the following body:
            | text          | new-Title            |
        When the "admin" user sends a "PUT" request to "/task/(task.data.task_id)/text" endpoint
        Then the response status code should be 204
        And the response body should have the following value in statusText:
            | statusText    | No Content           |
    
    @TA-05 @functional @createTask @deleteTask
    Scenario: A user can edit due time of Task (TA-05)
        Given the user sets the following body:
            | due_time      | 20:00:00             |
        When the "admin" user sends a "PUT" request to "/task/(task.data.task_id)/due" endpoint
        Then the response status code should be 204
        And the response body should have the following value in statusText:
            | statusText    | No Content           |

    @TA-06 @smoke @functional @createTask
    Scenario: A user can delete a Task (TA-06)
        When the "admin" user sends a "DELETE" request to "/task/(task.data.task_id)" endpoint
        Then the response status code should be 204
        And the response body should have the following value in statusText:
            | statusText    | No Content           |

    @TA-07 @negative
    Scenario: A user cannot create a Task with Text(name Task) empty (TA-07)
        Given the user sets the following body:
            | text          |                       |
            | description   | Desc task1            |
        When the "admin" user sends a "POST" request to "/task/" endpoint
        Then the response status code should be 400
        And the response body should have the following value in data error:
            | error    | Text must be non-empty     |

    @TA-08 @TA-09 @negative
    Scenario Outline: A user cannot get a Task with a <title> id (<id>)
        When the "admin" user sends a "GET" request to "/task/<invalidData>" endpoint
        Then the response status code should be 404
        And the response body should have the following value in statusText:
            | statusText    | Not Found           |
        Examples:
            | id     | title        | invalidData    |
            | TA-08  | invalid      | InvalidId      |
            | TA-09  | non-existent | 222222222      |

    @TA-10 @negative
    Scenario: A user cannot get a Task with empty task_id (TA-10)
        When the "admin" user sends a "GET" request to "/task/  " endpoint
        Then the response status code should be 400
        And the response body should have the following value in statusText:
            | statusText    | Bad Request           |

    @TA-11 @negative @createTask @deleteTask
    Scenario: A user cannot update text of Task with empty text (TA-11)
        Given the user sets the following body:
            | text          |               |
        When the "admin" user sends a "PUT" request to "/task/(task.data.task_id)/text" endpoint
        Then the response status code should be 400
        And the response body should have the following value in statusText:
            | statusText    | Bad Request   |

    @TA-12 @negative
    Scenario: A user cannot delete a Task with a value incorrect (TA-12)
        When the "admin" user sends a "DELETE" request to "/task/235645487" endpoint
        Then the response status code should be 404
        And the response body should have the following value in data error:
            | error    | not_found          |

    @TA-13 @functional 
    Scenario: A user can get the total of Task for today (TA-13)
        When the "admin" user sends a "GET" request to "/task/total/today" endpoint
        Then the response status code should be 200
        And the response body should have the following values TA-13:
            | count      | (response.data.count)          |
        And the schema response is the same with "taskTodaySchema"

    @TA-14 @smoke @functional @deleteLabel
    Scenario: A user can create a label (TA-14)
        Given the user sets the following body:
            | text          | Important    |
            | color         | FF7F50       |
        When the "admin" user sends a "POST" request to "/task/label" endpoint
        Then the response status code should be 200
        And the response body should have the following values TA-14:
            | label      | (response.data.label_id) |
        And the schema response is the same with "taskLabelSchema"

    @TA-15 @smoke @functional @createLabel @deleteLabel
    Scenario: A user can get a Label specific (TA-15)
        When the "admin" user sends a "GET" request to "/task/label/" endpoint
        Then the response status code should be 200
        And the response body should have the following values TA-15:
            | text      | API testing      |
        And the schema response is the same with "taskLabelSchemaGet"

    @TA-16 @smoke @functional @createLabel @deleteLabel
    Scenario: A user can update text of label (TA-16)
        Given the user sets the following body:
            | text          | First        |
        When the "admin" user sends a "PUT" request to "/task/label/(label.data.label_id)/" endpoint
        Then the response status code should be 204
        And the response body should have the following value in statusText:
            | statusText    | No Content   |

    @TA-17 @smoke @functional @createLabel
    Scenario: A user can delete a Label (TA-17)
        When the "admin" user sends a "DELETE" request to "/task/label/(label.data.label_id)" endpoint
        Then the response status code should be 204
        And the response body should have the following value in statusText:
            | statusText    | No Content           |

    @TA-18 @negative
    Scenario: A user cannot create a Label with Text(name Label) empty (TA-18)
        Given the user sets the following body:
            | text          |                       |
        When the "admin" user sends a "POST" request to "/task/label" endpoint
        Then the response status code should be 400
        And the response body should have the following value in data error:
            | error    | invalid_value     |

    @TA-19 @negative  @createLabel @deleteLabel
    Scenario: A user cannot update the color of a Label with value invalid (TA-19)
        Given the user sets the following body:
            | color          | A1B2C   |
        When the "admin" user sends a "PUT" request to "/task/label/(label.data.label_id)" endpoint
        Then the response status code should be 400
        And the response body should have the following value in data error-description:
            | error_description    | The color code is not valid     |

    @TA-20 @negative
    Scenario: A user cannot delete a Label with a value empty (TA-20)
        When the "admin" user sends a "DELETE" request to "/task/label/   " endpoint
        Then the response status code should be 404
        And the response body should have the following value in data error:
            | error    | not_found          |

    @TA-21 @negative @deleteTask
    Scenario: A user cannot create a task with a key invalid in due time (TA-21)
        Given the user sets the following body:
            | text          | Task-Invalid          |
            | due_date      | 2022-11-25            |
            | due_time_task | 19:00:00              |
        When the "admin" user sends a "POST" request to "/task/" endpoint
        Then the response status code should be 400

    @TA-22 @negative @createTask @deleteTask
    Scenario: A user cannot update text with invalid key (TA-22)
        Given the user sets the following body:
            | textt    | newTitle  |
        When the "admin" user sends a "PUT" request to "/task/(task.data.task_id)/text/" endpoint
        Then the response status code should be 400

    @TA-23 @negative @createTask @deleteTask 
    Scenario: A user cannot update due date and due time with invalid keys (TA-23)
        Given the user sets the following body:
            | due_dateee      | 2022-11-20  |
            | due_time_task     | 18:00:00    |
        When the "admin" user sends a "PUT" request to "/task/(task.data.task_id)/due" endpoint
        Then the response status code should be 400

    @TA-24 @negative @createTask @deleteTask
    Scenario: A user cannot update description with invalid key (TA-24)
        Given the user sets the following body:
            | Description_task  | Description invalid  |
        When the "admin" user sends a "PUT" request to "/task/(task.data.task_id)/description" endpoint
        Then the response status code should be 400

    @TA-25 @negative  @createLabel @deleteLabel
    Scenario: A user cannot update the color of a Label with invalid key (TA-25)
        Given the user sets the following body:
            | color_label          | A1B2C3   |
        When the "admin" user sends a "PUT" request to "/task/label/(label.data.label_id)" endpoint
        Then the response status code should be 400