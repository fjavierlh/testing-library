/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  modulePathIgnorePatterns: ["<rootDir>/lib"],
  collectCoverage: true,
  coverageDirectory: "./coverage",
  clearMocks: true,
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
    "./src/stats.ts": {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
};
