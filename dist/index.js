/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 396:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 716:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ }),

/***/ 944:
/***/ ((module) => {

module.exports = eval("require")("xml2js");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const core = __nccwpck_require__(396);
const github = __nccwpck_require__(716);
const fs = __nccwpck_require__(147);
const xml2js = __nccwpck_require__(944);

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

})();

module.exports = __webpack_exports__;
/******/ })()
;