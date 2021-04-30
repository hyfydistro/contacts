module.exports = {
  setupFilesAfterEnv: ['./jest.setup.unit.js'],
  testEnvironment: "jsdom",
  testMatch: ["**/tests/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "<rootDir>/tests/e2e/", "tests/demo.js"]
};