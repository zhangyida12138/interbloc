Feature: Create Server

  Scenario: User successfully creates a new server
    Given the user is on the create server page
    When the user enters the server host
    And the user submits the form
    Then the user should see a success message
    And the user should be redirected to the server management page

  Scenario: User submits an incomplete form
    Given the user is on the create server page
    When the user submits the form without entering the server host
    Then the user should see an error message
