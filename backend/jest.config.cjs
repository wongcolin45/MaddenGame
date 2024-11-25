module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/Tests/**/*.test.js'],  // Make sure this matches your test files
    transformIgnorePatterns: ['/node_modules/'], // Make sure we don't transform node_modules
    moduleFileExtensions: ['js'],
};