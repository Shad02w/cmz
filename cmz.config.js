module.exports = {
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
    ],
    resolve: ({ commitType, message }) => `(${commitType.name}) ${message}`,
}
