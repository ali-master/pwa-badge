module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  moduleDirectories: ['src', 'node_modules'],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  collectCoverageFrom: [
    '!**/*.d.ts',
    '!**/node_modules/**',
    'src/**/*.ts',
    '!./test/setupTests.js',
  ],
};
