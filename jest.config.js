module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFilesAfterEnv: ['./src/setupTests.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
  };
  