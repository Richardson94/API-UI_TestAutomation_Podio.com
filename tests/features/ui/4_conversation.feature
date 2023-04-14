@gui @conversation @wip
Feature: Conversation

    Defines scenarios about Conversation feature

    Background: Login
        When the user login into PODIO with "admin" role
        Then the URL to be redirect should be "https://podio.com/home"
        And the Home page components should be loaded

    @CO-00 @functional @browserStack
    Scenario: A user can access into conversation page(CO-00)
        When the user can enter on sidebar to see all conversations
        Then the URL to be redirect should be "https://podio.com/conversations" conversations
        And the page title should be "Messages | Podio"
    
    @CO-01 @leaveConversationGroup @functional @smoke
    Scenario: A user can create a new conversation between group of contacts(CO-01)
        When the user can enter on sidebar to see all conversations
        Then the user can create a new chanel with a group of users
            | subject     | TestingConversation              | 
            | message     | Message Tested                   |
        And the conversation should be created with "Message Tested" message

    @CO-02 @leaveConversationSingle @functional @smoke
    Scenario: A user can create a new conversation with one contact(CO-02)
        When the user can enter on sidebar to see all conversations
        Then the user can create a new chanel with one user
            | subject     | TestingConversation              | 
            | message     | Message Tested                   |
        And the conversation should be created with "Message Tested" message

    @CO-03 @createGroupConversationAPI @functional @smoke
    Scenario: A user can leave a conversation created whit group of contacts(CO-03)
        When the user can enter on sidebar to see all conversations
        Then the user can leave a "group" conversation
        And the conversation should not be displayed
    
    @CO-04 @createSingleConversationAPI @functional 
    Scenario: A user can leave a conversation created with one contact(CO-04)
        When the user can enter on sidebar to see all conversations
        Then the user can leave a "single" conversation
        And the conversation should not be displayed

    @CO-05 @createGroupConversationAPI @leaveConversationGroup @functional @smoke
    Scenario: A user can mark a group conversation as Unread(CO-05)
        When the user can enter on sidebar to see all conversations
        Then the user can mark a conversation created as unread
        And A dot should be display before the avatar

    @CO-06 @createSingleConversationAPI @leaveConversationSingle @functional
    Scenario: A user can mark a single conversation as Unread(CO-06)
        When the user can enter on sidebar to see all conversations
        Then the user can mark a conversation created as unread
        And A dot should be display before the avatar

    @CO-07 @createGroupConversationAPI @leaveConversationGroup @functional @smoke
    Scenario: A user can mark a group conversation as star(CO-07)
        When the user can enter on sidebar to see all conversations
        Then the user can mark a conversation created as star
        And A star should be display at the end of the conversation card

    @CO-08 @createSingleConversationAPI @leaveConversationSingle @functional 
    Scenario: A user can mark a single conversation as star(CO-08)
        When the user can enter on sidebar to see all conversations
        Then the user can mark a conversation created as star
        And A star should be display at the end of the conversation card

    @CO-09 @createGroupConversationAPI @markAsUnread @leaveConversationGroup @functional @smoke
    Scenario: A user can mark a group conversation as read(CO-09)
        When the user can enter on sidebar to see all conversations
        Then the user can mark as read an unread conversation created
        And A dot should not be display before the avatar
    
    @CO-10 @createSingleConversationAPI @markAsUnread @leaveConversationSingle @functional
    Scenario: A user can mark a single conversation as read(CO-10)
        When the user can enter on sidebar to see all conversations
        Then the user can mark as read an unread conversation created
        And A dot should not be display before the avatar

    @CO-11 @createGroupConversationAPI @markAsStar @leaveConversationGroup @functional @smoke
    Scenario: A user can mark a group conversation as Unstar(CO-11)
        When the user can enter on sidebar to see all conversations
        Then the user can mark as unstar an started conversation created
        And A star should not be display at the end of the conversation card

    @CO-12 @createSingleConversationAPI @markAsStar @leaveConversationSingle @functional
    Scenario: A user can mark a single conversation as Unstar(CO-12)
        When the user can enter on sidebar to see all conversations
        Then the user can mark as unstar an started conversation created
        And A star should not be display at the end of the conversation card

    @CO-13 @negative
    Scenario: A user can not create a conversation with the fields unfilled (CO-13)
        When the user can enter on sidebar to see all conversations
        Then the conversation cannot be created with thte fields unfilled
        And the conversation should not be created cause warnings

    @CO-14 @createGroupConversationAPI @markAsUnread @leaveConversationGroup @negative
    Scenario: A user can not mark as unread an unread conversation (CO-14)
        When the user can enter on sidebar to see all conversations
        Then the user can not mark as unread an unread conversation
        And the option to mark as unread should not be able

    @CO-15 @createSingleConversationAPI @markAsUnread @leaveConversationSingle @negative
    Scenario: A user can not mark as unread an unread conversation (CO-15)
        When the user can enter on sidebar to see all conversations
        Then the user can not mark as unread an unread conversation
        And the option to mark as unread should not be able

    @CO-16 @functional @E2E
    Scenario: Al one user interaction in podio with converation (CO-16)
        When the user can enter on sidebar to see all conversations
        Then the user can create a new chanel with a group of users
            | subject     | TestingConversation              | 
            | message     | Message Tested                   |
        And the conversation should be created with "Message Tested" message
        And the user can mark a conversation created as unread
        And the user can mark a conversation created as star
        And the user can leave a "group" conversation
        Then the conversation should not be displayed