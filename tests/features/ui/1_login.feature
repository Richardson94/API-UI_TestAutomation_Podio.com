@gui @login
Feature: Login

    Defines scenarios about Login feature

    @LO-01
    Scenario: A user can log-in into Podio (LO-01)
        When the user login into PODIO with "admin" role
        Then the URL to be redirect should be "https://podio.com/home"
        And the Home page components should be loaded
