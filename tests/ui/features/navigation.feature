Feature: Navigation

    Background:
        Given I visit CRUD-list App Home Page

    Scenario: Default State & Menu Items Click
        Then I should see 2 menu links
        And I should see that the home link is active
        And I should see that the home title is visible
        When I click the genre menu item
        Then I should see that the genre link is active
        And I should see that the genre title is visible
        When I click the home menu item
        Then I should see that the home link is active
        And I should see that the home title is visible
