# Junit Cucumber Test Results

Reads a Junit Cucumber XML file and outputs:
- tests = The total number of tests that have run
- failures = The number of failed tests
- errors = The number of test errors
- skipped = The number of skipped tests
- passed = The number of passed tests
- time = The time taken to run the tests
- summary = A summary of the test results


## Build a distribution

    $ npm run build

This will create/update the index.js file inside `dist` directory that will be used by the action. </br>
Make sure that every time you modify the code inside `src` directory, you run this command to update the content of `dist` directory. </br>
@vercel/ncc package is used to build the distribution into a single file, otherwise we would have to include the node_modules directory in the repository.

## How to use the action

    - name: Junit Cucumber Test Results
      id: junit-cucumber-test-results
      uses: chriton/junit-cucumber-results@v1.4
      with:
        path: 'test/cucumber.xml'

After the action has run, you can access the results using the following syntax:
    
    steps.junit-cucumber-test-results.outputs.tests
    steps.junit-cucumber-test-results.outputs.failures
    steps.junit-cucumber-test-results.outputs.errors
    steps.junit-cucumber-test-results.outputs.skipped
    steps.junit-cucumber-test-results.outputs.passed
    steps.junit-cucumber-test-results.outputs.time
    steps.junit-cucumber-test-results.outputs.summary
