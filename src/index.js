const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const xml2js = require('xml2js');

async function run() {

  try {
    //const filePath = process.env.FILE_PATH;
    const filePath = core.getInput('path');
    const xml = fs.readFileSync(filePath, 'utf8');

    let tests = 0;
    let failures = 0;
    let errors = 0;
    let skipped = 0;
    let passed = 0;
    let time = 0;

    xml2js.parseString(xml, (err, result) => {
        if (err) {
            console.error(err);
            core.setFailed(err);
            return;
        }
        tests = Number(result.testsuite.$.tests);
        failures = Number(result.testsuite.$.failures);
        errors = Number(result.testsuite.$.errors);
        skipped = Number(result.testsuite.$.skipped);
        passed = tests - failures - skipped;
        time = result.testsuite.$.time;

        // Console.log
        console.log("tests: ", tests);
        console.log("failures: ", failures);
        console.log("errors: ", errors);
        console.log("skipped: ", skipped);
        console.log("passed: ", passed);
        console.log("time: ", time);

        // Workflow log
        core.info("Test")

        // Output to use in other steps
        core.setOutput("tests", tests);
        core.setOutput("failures", failures);
        core.setOutput("errors", errors);
        core.setOutput("skipped", skipped);
        core.setOutput("passed", passed);
        core.setOutput("time", time);

        // Annotations
        core.notice("Finished processing test results.");
        core.notice("tests: " + tests);
        core.notice("failures: " + failures);
        core.notice("errors: " + errors);
        core.notice("skipped: " + skipped);
        core.notice("passed: " + passed);
        core.notice("time: " + time);
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
