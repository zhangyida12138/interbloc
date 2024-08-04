Feature: User Login

  Scenario: User successfully logs in
    Given the user is on the login page
    When the user enters their email
    And the user enters their password
    And the user submits the login form
    Then the user should be redirected to the dashboard

  Scenario: User enters incorrect credentials
    Given the user is on the login page
    When the user enters an incorrect email
    And the user enters an incorrect password
    And the user submits the login form
    Then the user should see an error message
