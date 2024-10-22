module.exports = {
    testEnvironment: 'node',
    reporters: [
      "default",
      ["./node_modules/jest-html-reporter", {
        "pageTitle": "BoM Controller Test Report",
        "outputPath": "test-report.html",
        "includeFailureMsg": true,
        "includeConsoleLog": true
      }]
    ],
  };
  