# Junit Cucumber Test Results

Reads a Junit cucumber XML file and outputs:
    - tests = The total number of tests that have run
    - failures = The number of failed tests
    - errors = The number of test errors
    - skipped = The number of skipped tests
    - passed = The number of passed tests
    - time = The time taken to run the tests


## Build a distribution

    $ npm run build

## How to use the action

    - name: Junit Cucumber Test Results
      id: junit-cucumber-test-results
      uses: chriton/junit-cucumber-results@main
      with:
        path: 'test/cucumber.xml'
