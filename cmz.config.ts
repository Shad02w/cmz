import { defineConfig } from './src/index'

export default defineConfig({
    commitTypes: [
        {
            name: 'Refactor',
            description: 'A code change that neither fixes a bug nor adds a feature',
        },
        {
            name: 'Fix',
            description: 'A bug fix',
        },
        {
            name: 'Upgrade',
            description: 'Upgraded the dependencies of repo ',
        },
        {
            name: 'Chore',
            description: 'Upgraded the dependencies of repo ',
        },
    ],
    scope: [
        {
            name: 'web/game',
        },
        {
            name: 'web/mobile',
        },
        {
            name: 'app',
        },
        {
            name: 'shared',
        },
        {
            name: 'all',
        },
    ],
    resolve: ({ commitType, scope, message }) => `[${commitType}]: ${scope ? `${scope}: ` : ''}${message}`,
})
