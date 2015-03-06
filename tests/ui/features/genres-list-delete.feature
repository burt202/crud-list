Feature: Deleting Genres

  Background:
    Given I visit CRUD-list App Genres Page
    And I make sure that there are no genres in the db
    And I inject the genre "Jazz" into the db

  Scenario: Deleting Genres
    When I delete the genre with row index 0
    Then I should see a success notification
    And I should see an empty genre list
    And I should see the genres total count as "0 genres"
    When I refresh the page
    Then I should see an empty genre list
    And I should see the genres total count as "0 genres"
