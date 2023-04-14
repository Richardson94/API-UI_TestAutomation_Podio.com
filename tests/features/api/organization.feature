@api @organization
Feature: Organizations

    Defines scenarios for Organizations feature
    
    @OR-01 @functional @deleteOrgCreate @smoke
    Scenario: A user can create a organization (OR-01)
        Given the user sets the following body:
            |name|porg028|
        When the "admin" user sends a "POST" request to "/org/" endpoint
        Then the response status code should be 200
        And the response body should have the following values OR-01:
            |url|https://podio.com/porg028|
            |url_label|porg028            |
        And the schema response is the same with "organizationCreateSchema"

    @OR-02 @functional @createOrganization @deleteOrg @smoke
    Scenario: Get-Organization (OR-02)
       When the "admin" user sends a "GET" request to "/org/" endpoint      
       Then the response status code should be 200
       And the response body should have the following values OR-02:
            | grants_count | 0                            |
            | rank         | 4                            |
            | name         | newOrg                       |
            | url_label    | neworg                       |
            | url          | https://podio.com/neworg     |
            | role         | admin                        |
            | type         | free                         |
            | premium      | false                        |
            | status       | active                       |
       And the schema response is the same with "organizationGetSchema"    

    @OR-03 @functional @createOrganization @deleteOrg @smoke
    Scenario: Update-NameOrganization (OR-03)
       Given the user sets the following body:
       | name | newOrg_update |
       When the "admin" user sends a "PUT" request to "/org/(newOrganization.data.org_id)" endpoint
       Then the response status code should be 204    
    
    @OR-04 @negative @createOrganization @deleteOrg
    Scenario: A user cannot delete an organization through its id (OR-4)
        When the "admin" user sends a "DELETE" request to "/org/(newOrganization.data.org_id)/appstore/" endpoint
        Then the response status code should be 404
        And the response body should have the following data errors:
            |error_parameters  | {}               |
            |error_detail      | null             |
            |error_propagate   | false            |
            |error_description | No profile found |
            |error             | not_found        |

    @OR-05 @negative @createOrganization @deleteOrg
    Scenario: A user cannot delete an organization through its id (OR-5)
        When the "admin" user sends a "DELETE" request to "/org/(newOrganization.data.org_id)" endpoint
        Then the response status code should be 403
        And the response body should have the following data errors:
            |error_parameters  | {}               |
            |error_detail      | null             |
            |error_propagate   | false            |
            |error_description | Only available for clients with a trust level of 5 or higher. To get your API client upgraded to a higher trust level contact support at https://help.podio.com.|
            |error             | forbidden        |
    
    @OR-06 @negative 
    Scenario: Verify that the user cannot create a new Organization with name invalid value in body from API [OR-06]
        Given the user should have the following body:
                | name |  |
        When the "admin" user sends a "POST" request to "/org/" endpoint
        Then the response status code should be 400
        And the response body should have the following data errors:
            |error_parameters  | {}               |
            |error_detail      | null             |
            |error_propagate   | false            |
            |error_description | Invalid value "" (string): must be non empty string |
            |error             | invalid_value        |

    