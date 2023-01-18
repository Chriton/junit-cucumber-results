const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const xml2js = require('xml2js');

/**
 * Converts the given seconds to a Human Readable format.
 * Example: 1h 2m 3s
 *
 * @param sec The number of seconds to convert.
 * @returns {string} The Human Readable format.
 */
function convertTime(sec) {
    let sec_num = parseInt(sec, 10); // don't forget the second param
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);

    return (hours === 0 ? '' : hours + 'h ') + (minutes === 0 && hours === 0 ? '' : minutes + 'min ') + seconds + 'sec';
}

async function run() {

    try {
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
            time = convertTime(result.testsuite.$.time);
            summary = tests + " test(s), " + failures + " failures, " + errors + " errors, " + skipped + " skipped, " + passed + " passed.";

            // Workflow log
            core.info("Finished parsing test results.");

            // Output to use in other steps
            core.setOutput("tests", tests);
            core.setOutput("failures", failures);
            core.setOutput("errors", errors);
            core.setOutput("skipped", skipped);
            core.setOutput("passed", passed);
            core.setOutput("time", time);
            core.setOutput("summary", summary);

            // Annotations
            core.notice("Test Summary: " + summary);
            core.notice("Test run time: " + time);
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();