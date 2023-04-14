@api @space
Feature: Spaces

    Define scenarios for test Spaces

    @SP-01 @smoke @functional
    Scenario: Verify that the user can create a new Space from API [SP-01]
        Given the user should have the following body:
                | org_id | 1864174 |
                | name   | test01  |
        When the "admin" user sends a "POST" request to "/space/" endpoint
        Then the response status code should be 200
        And the response body should have the following values SP-01:
                | url | https://podio.com/organization-spaces/test01 |
                | full_url | https://podio.com/organization-spaces/test01 |
        And the schema response is the same with "spaceCreateSchema"

    @SP-02 @negative
    Scenario: Verify that the user cannot create a new Space without org_id in data body from API [SP-02]
        Given the user should have the following body:
                | name | testtt |
        When the "admin" user sends a "POST" request to "/space/" endpoint
        Then the response status code should be 400

    @SP-03 @negative
    Scenario: Verify that the user cannot create a new Space with incorrect field body from API [SP-03]
        Given the user should have the following body:
                | org_id | incorrectId |
                | name | testtt |
        When the "admin" user sends a "POST" request to "/space/" endpoint
        Then the response status code should be 400


    @SP-04 @smoke @functional @createSpace
    Scenario: Verify that the user can get Spaces by ID from API [SP-04]
       When the "admin" user sends a "GET" request to "/space/(newSpace.data.space_id)" endpoint
       Then the response status code should be 200
       And the response body should have the following values SP-02:
               | org_id | 1864174 |
       And the schema response is the same with "spaceGetByIDSchema"

    @SP-05 @functional
    Scenario: Verify that the user can get the top of Spaces from API [SP-05]
       When the "admin" user sends a "GET" request to "/space/top/?limit=2" endpoint
       Then the response status code should be 200
       And the response body should have the following values SP-05:
               | name | testExploratory |       
       And the schema response is the same with "spaceGetTopSpaces"

    @SP-06 @negative @createSpace
    Scenario: Verify that the user cannot get Space with an incorrect ID from API [SP-06]
       When the "admin" user sends a "GET" request to "/space/incorrectID" endpoint
       Then the response status code should be 404

    @SP-07 @negative
    Scenario: Verify that the user cannot get Top Space with an incorrect type of Data in number of Spaces [SP-07]
       When the "admin" user sends a "GET" request to "/space/top/?limit=incorrectType" endpoint
       Then the response status code should be 400


    @SP-08 @smoke @functional @createSpace
    Scenario: Verify that the user can update Spaces from API [SP-08]
       Given the user sets the following body:
       | name | updateTestName |
       When the "admin" user sends a "PUT" request to "/space/(newSpace.data.space_id)" endpoint
       Then the response status code should be 204


    @SP-09 @negative @createSpace
    Scenario: Verify that the user cannot update Spaces with  Invalid Space ID [SP-09]
       Given the user sets the following body:
       | name | updateTestName |
       When the "admin" user sends a "PUT" request to "/space/incorrectID" endpoint
       Then the response status code should be 404

    @SP-10 @negative @createSpace
    Scenario: Verify that the user cannot update Spaces with  Invalid name of data in Request Body [SP-10]
       Given the user sets the following body:
       | name-space | updateTestName |
       When the "admin" user sends a "PUT" request to "/space/(newSpace.data.space_id)" endpoint
       Then the response status code should be 400


    @SP-11 @negative @createSpace
    Scenario: Verify that isn`t posible Delete a Space without pay account [SP-11]
       When the "admin" user sends a "DELETE" request to "/space/(newSpace.data.space_id)" endpoint
       Then the response status code should be 403
       
       
       
       
