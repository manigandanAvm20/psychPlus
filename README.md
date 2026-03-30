# psychPlus
This repository is created to maintain the framework and coding developed for the PsychPlus assignment using the Playwright with Javascript

**Installation**

1.	Clone the repository
# *bash*
git clone <your-repo-url>
cd <your-project-folder>

2.	Install dependencies
# *bash*
npm install

3.	Install Playwright browsers
# *bash*
npx playwright install

# Running Tests
Run all tests
# *bash*
npx playwright test

# Run UI tests only
(assuming UI tests are placed under tests/ui/)
# *bash*
npx playwright test tests/ui

# Run API tests only
(assuming API tests are placed under tests/api/)
# *bash*
npx playwright test tests/api

# Test Reports
Generate and open the HTML report:
# *bash*
npx playwright show-report

**Useful Commands**

## Run tests in headed mode (see browser):
# *bash*
npx playwright test --headed

## Run a specific test file:
# *bash*
npx playwright test tests/api/nasaApi.spec.js

## Run a specific test by name:
# *bash*
npx playwright test -g "Scenario_01 - API - Search and fetch asset details"

**Best Practices**

•	Keep UI tests and API tests in separate folders for clarity.
•	Use a helper module (like apiHelper.js) to centralize API base URLs and common parameters.
•	Configure screenshots, videos, and traces in playwright.config.js for easier debugging:

## JavaScript

use: {
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
  trace: 'retain-on-failure'
}

##Flaky issues
 - Used assert built-in auto-waiting mechanisms. 
 - Used reliable locators such as getByRole, getByText and Xpath.
 - Analyzed failures using retries, tracing, screenshots and video recording options  
