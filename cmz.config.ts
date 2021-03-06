import { defineConfig } from '@shad02w/cmz'

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
            name: 'Feature',
            description: 'Newly added functionalities',
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
