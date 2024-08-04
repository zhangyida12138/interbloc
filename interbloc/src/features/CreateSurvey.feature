Feature: Create Survey

  Scenario: User successfully creates a new survey
    Given the user is on the create survey page
    When the user enters the survey name
    And the user enters the survey description
    And the user creates the survey questions
    And the user submits the form
    Then the user should see a success message
    And the user should be redirected to the survey management page

  Scenario: User submits an incomplete form
    Given the user is on the create survey page
    When the user submits the form without entering the survey name
    Then the user should see an error message
