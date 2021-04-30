module.exports = {
  setupFilesAfterEnv: ['./jest.setup.e2e.js'],

  preset: 'jest-playwright-preset',

  testMatch: [
    "<rootDir>/tests/e2e/**/*.js",
  ],
  testPathIgnorePatterns: ["/node_modules/"],

  testEnvironmentOptions: {
    "jest-playwright": {
      browsers: ["chromium", "firefox", "webkit"]
    }
  }
};
