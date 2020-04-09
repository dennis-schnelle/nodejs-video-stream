// eslint-disable-next-line no-undef
module.exports = {
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    setupFilesAfterEnv: ['<rootDir>enzyme.config.js'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.svg$': '<rootDir>/svgTransform.js',
    },
    testMatch: ['<rootDir>/src/**/*.test.tsx', '<rootDir>/src/**/*.test.ts'],
    rootDir: '.',
    moduleNameMapper: {
        '@root/(.*)$': '<rootDir>$1',
        '@internal/(.*)$': '<rootDir>src/$1',
        '@public/(.*)$': '<rootDir>public/$1',
        storefront: '<rootDir>src/exports.ts',
    },
    modulePathIgnorePatterns: ['<rootDir>/webpack/', '/node_modules/'],
    silent: false,
};
