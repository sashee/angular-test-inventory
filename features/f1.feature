Feature: Handling places
  The users should be able to handle places.
  Places are where stuffs can be located.
  They have a name and a description, and a history.
  They can be created and all their data modified.

  Scenario: Places dashboard
    Given I am on the main page
    Then I should see "No stuffs here" in the place "Rebel base"
      And I should see "Laser pistol" in the place "X-wing 1"
      And I shouldn't see "The Force" in any place

  Scenario: Navigating to the places page
    Given I am on the main page
    When I click on the Organize button next to Places
    Then The heading should be "Places"
      And I should see "New"
      And I should see the "Rebel base" place
    When I click on the back arrow
    Then The heading should be "Dashboard"

  Scenario: Create new place
    Given I am on the places page
    When I click on the add place header
      And I write "newplace1" as the name
      And I write "newplace1 description" as the description
      And I click on the "CREATE" button
    Then I should see the "newplace1" place
    When I click on the add place header
      And I write "newplace2" as the name
      And I click on the "CANCEL" button
      And I click on the add place header
    Then I should see "" as the name
    When I write "newplace3" as the name
      And I click on the add place header
      And I click on the add place header
    Then I should see "newplace3" as the name

  Scenario: Modify an existing place
    Given I am on the places page
    When I click on the "Rebel base" place header
    Then I should see "Rebel base" as the name
    When I write "newplace5" as the name
      And I click on the "SAVE" button
    Then I should see the "newplace5" place
      And I shouldn't see the "Rebel base" place
    When I click on the "newplace5" place header
      And I write "newplace5 description" as the description
      And I click on the "SAVE" button
      And I click on the "newplace5" place header
    Then I should see "newplace5 description" as the description


  Scenario: Get the place history
    Given I am on the places page
    When I click on the History button on "Rebel base" header
    Then The heading should be "Rebel base history"
      And I should see "Wookie food moved here"
      And I should see "Wookie food moved away"

Feature: Handling stuffs
    The user should be able to create, edit and view stuffs.
    Stuffs are arbitrary objects that can be assigned to a place.
    They also retain history.

  Scenario: The dashboard lists the stuffs
    Given I am on the main page
    Then I should see stuff "Laser pistol"
      And I should see stuff "The Force"

  Scenario: Navigating to the stuffs page
    Given I am on the main page
    When I click on the Organize button next to Stuffs
    Then The heading should be "Stuffs"
      And I should see "New"
      And I should see the "Laser pistol" stuff
    When I click on the back arrow
    Then The heading should be "Dashboard"

  Scenario: Create new stuff
    Given I am on the stuffs page
    When I click on the "NEW" button
      And I write "newstuff1" as the stuff name
      And I click on the "SAVE" button
    Then I should see the "newstuff1" stuff
    When I click on the "NEW" button
      And I write "newstuff2" as the stuff name
      And I click on the "CANCEL" button
    Then I shouldn't see the "newstuff2" stuff
    When I click on the "NEW" button
      Then The stuff name input should be empty

  Scenario: Edit the stuff's basic info
    Given I am on the stuffs page
    When I click on the "EDIT" button next to the "Laser pistol" stuff
    Then The heading should be "Laser pistol"
    When I write "newname1" as the name for the stuff
      And I click on the "CANCEL" button
    Then The stuff's name should be "Laser pistol"
    When I write "newname1" as the name for the stuff
      And I click on the "SAVE" button
    Then The stuff's name should be "newname1"
      And The heading should be "newname1"
    When I write "newnamedesc1" as the description for the stuff
      And I click on the "CANCEL" button
    Then The stuff's description should be "Useful in some situations"
    When I write "newnamedesc1" as the description for the stuff
      And I click on the "SAVE" button
    Then The stuff's description should be "newnamedesc1"

  Scenario: View the stuff's image carousel
    Given I am on the stuffs page
    When I click on the "EDIT" button next to the "Secret papers about the Death Star" stuff
    Then I should see image "0" for stuff "4"
      And I shouldn't see the previous image arrow
      And I should see the next image arrow
    When I click on the next image arrow
    Then I should see image "1" for stuff "4"
      And I should see the previous image arrow
    When I click on the next image arrow
    Then I should see image "2" for stuff "4"
      And I shouldn't see the next image arrow
    When I click on the previous image arrow
    Then I should see image "1" for stuff "4"
      And I should see the next image arrow

  Scenario: Taking stuffs to places and viewing history
    Given I am on the stuffs page
    Then I should see that "Laser pistol" is at "X-wing 1"
    When I click on the place next to "Laser pistol"
      And I select "Hideout"
      And I click on the "CANCEL" button
    Then I should see that "Laser pistol" is at "X-wing 1"
    When I click on the place next to "Laser pistol"
      And I select "Rebel base"
      And I click on the "OK" button
    Then I should see that "Laser pistol" is at "Rebel base"
    When I click on the History button on "Laser pistol" stuff header
    Then I should see "Rebel base"
    When I click on the back arrow
      And I click on the back arrow
    Then I should see "Laser pistol" in the place "Rebel base"
    When I click on the Organize button next to Places
      And I click on the History button on "Rebel base" header
    Then I should see "Laser pistol moved here"