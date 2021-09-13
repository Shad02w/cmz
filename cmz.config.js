const { defineConfig } = require('@shad02w/cmz')

module.exports = defineConfig({
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
            description: 'Dependencies update and change',
        },
        {
            name: 'Publish',
            description: 'Release a new version to npm',
        },
    ],
    resolve: ({ commitType, message }) => `(${commitType.name}) ${message}`,
})
