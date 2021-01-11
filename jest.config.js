module.exports = {
  collectCoverage: true,
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '\\.ts$': 'ts-jest',
    '\\.js$': 'babel-jest',
  },
  moduleDirectories: ['src', 'node_modules'],
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
  collectCoverageFrom: [
    '!**/*.d.ts',
    '!**/node_modules/**',
    'src/**/*.ts',
    'src/**/*.js',
    '!./test/setupTests.js',
  ],
};
