@api @conversation
Feature: Conversation

    Defines scenarios about conversation feature

    @CO-01 @deleteConversation @functional @smoke
    Scenario: A user can create a new Conversation (CO-01)
        Given the user should have the following body for conversation with one user:
             | subject | conv_testing |
             | text | testing |
             | session |{"type": "normal","data": ""} |
        When the "admin" user sends a "POST" request to "/conversation/v2/" endpoint
        Then the response status code should be 200
        And the response body should have following values CO-01-02:
             | subject | conv_testing |
             | text | testing |
        And the schema response is the same with "conversationCreateSchema"
    
    @CO-02 @deleteConversation @functional
    Scenario: A user can create a specific new Conversation (CO-02)
        Given the user should have the following body for conversation with more than one user:
             | subject | conv_esp_testing |
             | text    | testing          |
             | session |{"type": "normal","data": ""} |
        When the "admin" user sends a "POST" request to "/conversation/v2/" endpoint
        Then the response status code should be 200
        And the response body should have following values CO-01-02:
             | subject | conv_esp_testing |
             | text | testing |
        And the schema response is the same with "conversationCreateSchema"

    @CO-03 @createConversation @deleteConversation @functional
    Scenario: A user can get all Conversation (CO-03)
        Given the user sets the following body:
           | ref_type | conversation |
           | type     | group        |
        When the "admin" user sends a "GET" request to "/conversation/" endpoint
        Then the response status code should be 200
        And the response body should have following values CO-03:
           | ref_type | conversation |
           | type | group |
        And the schema response is the same with "conversationGetAllSchema"
     
     @CO-04 @createConversation @deleteConversation @functional @smoke
     Scenario: A user can get specific Conversation (CO-04)
        Given the user sets the following body:
           | action | message |
        When the "admin" user sends a "GET" request to "/conversation/(conversation.data.conversation_id)/event" endpoint
        Then the response status code should be 200
        And the response body should have following values CO-04:
           | action | message |
        And the schema response is the same with "conversationGetSpecifiSchema"

   @CO-05 @createConversation @deleteConversation @functional @smoke
     Scenario: A user can mark a conversation as Read (CO-05)
        Given the user sets the following body:
           | action | message |
        When the "admin" user sends a "POST" request to "/conversation/(conversation.data.conversation_id)/read" endpoint
        Then the response status code should be 204

   @CO-06 @createConversation @deleteConversation @functional @smoke
     Scenario: A user can mark a conversation as Unread (CO-06)
        Given the user sets the following body:
           | action | message |
        When the "admin" user sends a "DELETE" request to "/conversation/(conversation.data.conversation_id)/read" endpoint
        Then the response status code should be 204

   @CO-07 @createConversation @deleteConversation @functional
     Scenario: A user can mark a conversation as Start  (CO-07)
        Given the user sets the following body:
           | action | message |
        When the "admin" user sends a "POST" request to "/conversation/(conversation.data.conversation_id)/star" endpoint
        Then the response status code should be 204
 
    @CO-08 @createConversation @deleteConversation @functional
     Scenario: A user can mark as Unstart a Conversation (CO-08)
        Given the user sets the following body:
           | action | message |
        When the "admin" user sends a "DELETE" request to "/conversation/(conversation.data.conversation_id)/star" endpoint
        Then the response status code should be 204

   @CO-09 @createConversation @deleteConversation @negative
     Scenario: A user can not get a specific Conversation with invalid values (CO-09)
        When the "admin" user sends a "GET" request to "/conversation/<invalidData>/event" endpoint
        Then the response status code should be 404
        And the response body should have the following value in statusText:
            | statusText    | Not Found           |
        Examples:
            | id     | title        | invalidData    |
            | CO-04  | invalid      | InvalidId      |

   @CO-10 @createConversation @deleteConversation @negative
     Scenario: A user can not get all conversation with an invalid param (CO-10)
        When the "admin" user sends a "GET" request to "/conversation/<invalidData>" endpoint
        Then the response status code should be 404
        And the response body should have the following value in statusText:
            | statusText    | Not Found           |
        Examples:
            | id     | title        | invalidData    |
            | CO-03  | invalid      | InvalidId      |

   @CO-11 @createConversation @deleteConversation @negative
     Scenario: A user can not mark a conversation as Read with invalid data(CO-11)
        Given the user sets the following body:
           | action | message |
        When the "admin" user sends a "POST" request to "/conversation/<invalidData>/read" endpoint
        Then the response status code should be 404
        And the response body should have the following value in statusText:
            | statusText    | Not Found           |
        Examples:
            | id     | title        | invalidData    |
            | CO-05  | invalid      | InvalidId      |

   @CO-12 @createConversation @deleteConversation @negative
     Scenario: A user can not mark a conversation as Unread with invalid data(CO-12)
        Given the user sets the following body:
           | action | message |
        When the "admin" user sends a "DELETE" request to "/conversation/<invalidData>/read" endpoint
        Then the response status code should be 404
        And the response body should have the following value in statusText:
            | statusText    | Not Found           |
        Examples:
            | id     | title        | invalidData    |
            | CO-05  | invalid      | InvalidId      |
        
   @CO-13 @createConversation @deleteConversation @negative
     Scenario: A user can not mark a conversation as start with invalid Data (CO-13)
        Given the user sets the following body:
           | action | message |
        When the "admin" user sends a "POST" request to "/conversation/<invalidData>/star" endpoint
        Then the response status code should be 404
        And the response body should have the following value in statusText:
            | statusText    | Not Found           |
        Examples:
            | id     | title        | invalidData    |
            | CO-07  | invalid      | InvalidId      |

   @CO-14 @createConversation @deleteConversation @negative
     Scenario: A user can not mark a conversation as unstart with invalid Data  (CO-14)
        Given the user sets the following body:
           | action | message |
        When the "admin" user sends a "DELETE" request to "/conversation/<invalidData>/star" endpoint
        Then the response status code should be 404
        And the response body should have the following value in statusText:
            | statusText    | Not Found           |
        Examples:
            | id     | title        | invalidData    |
            | CO-08  | invalid      | InvalidId      |
