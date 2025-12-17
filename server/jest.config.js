export default {
  testEnvironment: "node",
  transform: {},
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/server.js",
    "!src/**/*.test.js",
    "!src/tests/**"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50
    }
  }
};
