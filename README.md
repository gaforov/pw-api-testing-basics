# API Testing with Playwright: A Beginner's Guide

_This repository provides foundational examples and exercises for API testing using Playwright. It is structured to help users understand and implement basic API testing concepts effectively._

## Repository Structure

- **.auth/**: Contains authentication-related configurations or credentials necessary for accessing certain APIs during testing.
- **test-data/**: Includes sample data files used as inputs for various test cases, facilitating data-driven testing approaches.
- **tests/**: Houses the test scripts written in TypeScript, utilizing Playwright's testing capabilities to perform API requests and validate responses.
- **.gitignore**: Specifies files and directories for Git to ignore, ensuring sensitive or unnecessary files are not committed to the repository.
- **package-lock.json**: Automatically generated file that locks the versions of the project's dependencies, ensuring consistent installations across different environments.
- **package.json**: Contains metadata about the project, including dependencies, scripts, and other configurations essential for setting up the development environment.
- **playwright.config.ts**: Configuration file for Playwright, defining settings such as test directories, timeouts, and other options to customize the testing environment.

## Getting Started

To set up and run the tests locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/gaforov/pw-api-testing-basics.git
   ```

2. Navigate to the project directory:
    ```bash
    cd pw-api-testing-basics
    ```
3. Install dependencies:

    Ensure you have Node.js installed. Then, install the project dependencies using npm:
    ```bash
    npm install
    ```
4. Configure authentication:

    Populate the .auth directory with the necessary authentication credentials required for the APIs under test. Ensure these files are correctly formatted and contain valid credentials.

5. Run the tests:

    Execute the tests using the following command:

    ```bash
    npx playwright test
    ```

## **⚠️ How to Run These API Tests**

If you want to run all the API tests together, such as for a regression test, ensure you configure the tests to run with a single worker. This is crucial because API tests in this repository involve continuous creation and deletion of articles on a blog website. Running tests in parallel might cause failures due to deletions being executed before creations.

### Run with a Single Worker
1. Use the following command to run all tests with a single worker:
    ```bash
    npx playwright test --workers=1
    ```
2. Alternatively, you can use the predefined script in package.json. Simply run:
    ```bash
    npm run test:single-worker
    ```
This will execute the command npx playwright test --workers=1 for you.

### Configure a Single Worker in Playwright Config
If you prefer to configure this directly in the playwright.config.ts file, you can set the workers option to 1:

```typescript
export default {
  workers: 1,
  // Other configurations...
};
```

## Writing Tests
Test scripts are located in the tests/ directory. Each script is designed to test specific API endpoints or functionalities. The tests utilize Playwright's API testing capabilities to send requests and assert responses.

### Author

This project is created and maintained by [Said Gaforov](https://github.com/gaforov).

