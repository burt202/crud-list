Feature: Updating Genres

    Background:
        Given I visit CRUD-list App Genres Page
        And I make sure that there are no genres in the db
        And I inject the genre "Jazz" into the db

    Scenario: Updating Genres
        When I update the genre with row index 0
        Then I should see the genres form
        And I should see the genres form title is "Update Jazz"
        And I should see that the name input is pre-populated with "Jazz"
        When I clear the name input
        And I click the update button
        Then I should see a validation error
        When I type "Jazzier" in the name input
        And I click the update button
        Then I should see a success notification
        And I should see the genres total count as "1 genre"
        And I should see that the genre list has 1 items
        And I should see the genre "Jazzier" on row index "0"
        When I refresh the page
        Then I should see the genres total count as "1 genre"
        And I should see that the genre list has 1 items
