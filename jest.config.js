module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.js'],
  verbose: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/']
};
