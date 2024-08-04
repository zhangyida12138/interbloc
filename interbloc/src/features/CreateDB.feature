Feature: Create Database

  Scenario: User successfully creates a new database
    Given the user is on the create database page
    When the user enters the database name
    And the user selects a server
    And the user submits the form
    Then the user should see a success message
    And the user should be redirected to the database management page

  Scenario: User submits an incomplete form
    Given the user is on the create database page
    When the user submits the form without entering the database name
    Then the user should see an error message
