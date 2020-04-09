// eslint-disable-next-line no-undef
module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    setupFilesAfterEnv: ['<rootDir>enzyme.config.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: ['<rootDir>/src/**/*.test.tsx', '<rootDir>/src/**/*.test.ts'],
    rootDir: '.',
    moduleNameMapper: {},
    modulePathIgnorePatterns: ['<rootDir>/webpack/', '/node_modules/'],
    silent: false,
};
