Feature: Adding Genres

    Background:
        Given I visit CRUD-list App Genres Page
        And I make sure that there are no genres in the db

    Scenario: Adding Genres
        Then I should see an empty genre list
        And I should see the genres total count as "0 genres"
        When I click the new button
        Then I should see the genres form
        And I should see the genres form title is "Add A Genre"
        When I click the cancel button
        Then I should not see the genres form
        When I click the new button
        And I click the add button
        Then I should see a validation error
        When I focus on the name input
        Then I should not see the validation error
        When I type "Rock" in the name input
        And I click the add button
        Then I should see a success notification
        And I should not see the genres form
        And I should see the genres total count as "1 genre"
        And I should see that the genre list has 1 items
        And I should see the genre "Rock" on row index "0"
        When I click the new button
        And I type "Jazz" in the name input
        And I click the add button
        When I click the new button
        And I type "Folk" in the name input
        And I click the add button
        Then I should see the genres total count as "3 genres"
        And I should see that the genre list has 3 items
        And I should see the genre "Folk" on row index "0"
        And I should see the genre "Jazz" on row index "1"
        And I should see the genre "Rock" on row index "2"
        When I refresh the page
        Then I should see the genres total count as "3 genres"
        And I should see that the genre list has 3 items
