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
    let summary = '';

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
        summary = tests + " test(s), " + failures + " failures, " + errors + " errors, " + skipped + " skipped, " + passed + " passed.";

        // Workflow log
        core.info("Finished parsing the test results");

        // Output to use in other steps
        core.setOutput("tests", tests);
        core.setOutput("failures", failures);
        core.setOutput("errors", errors);
        core.setOutput("skipped", skipped);
        core.setOutput("passed", passed);
        core.setOutput("time", time);

        // Annotations
        core.notice("Test Summary: " + summary);
        core.notice("Test run time: " + time + "s");
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
