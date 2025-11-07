/** @type {import('jest').Config} */
module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/'],
  testMatch: ['**/*.spec.ts'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/main.ts',
    '!src/**/*.module.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'text-summary', 'lcov'],
  transform: {
    '^.+\\.(ts|js|mjs|html)$': 'jest-preset-angular',
  },
  // Map style imports so Jest doesn't try to parse styles as JS
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
    , '\\.(html)$': '<rootDir>/src/test/htmlMock.js'
  },
  moduleFileExtensions: ['ts', 'js', 'mjs', 'html', 'json'],
  clearMocks: true,
};