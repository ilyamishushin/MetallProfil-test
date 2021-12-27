module.exports = {
    rootDir: '../../',
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        CONFIG_NAME: 'base',
    },
    testMatch: ['**/?(*.)(test).ts'],
};
