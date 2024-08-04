Feature: Create Tenant

  Scenario: User successfully creates a new tenant
    Given the user is on the create tenant page
    When the user enters the tenant name
    And the user enters the tenant logo URL
    And the user selects a database ID
    And the user submits the form
    Then the user should see a success message
    And the user should be redirected to the tenant management page

  Scenario: User submits an incomplete form
    Given the user is on the create tenant page
    When the user submits the form without entering the tenant name
    Then the user should see an error message
