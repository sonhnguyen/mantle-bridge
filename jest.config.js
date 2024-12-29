module.exports = {
  preset: "ts-jest", // Use ts-jest preset
  testEnvironment: "node", // Test environment for Node.js
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"], // Pattern for test files
  moduleFileExtensions: ["ts", "js", "json", "node"], // Recognize these extensions
};
