module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__test__/**/*.test.ts'],
  transform: {
    '^.+\\.ts': 'babel-jest',
  },
  moduleDirectories: ['node_modules', 'src'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
};
