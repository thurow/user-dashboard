/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // All imported modules in your tests should be mocked automatically
  // automock: false,

  // Stop running tests after `n` failures
  bail: 1,

  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom : [
    "<rootDir>/src/components/**/*.{ts,tsx}",
    "<rootDir>/src/pages/**/*.{ts,tsx}",
    "!**/node_modules/**",
    "!**/dist/**"
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",

  coverageThreshold: {
    global: {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  },

  testMatch: ['<rootDir>/src/**/?(*.)test.{ts,tsx}'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  testPathIgnorePatterns: ['/node_modules/', '/public/'],

  // A list of paths to directories that Jest should use to search for files in
  roots: ['<rootDir>/src'],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};
