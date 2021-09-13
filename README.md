# CMZ
A helpful commit cli 😂😂😂😂😂😂😂

## Installation

### Global

```bash
yarn add global @shad02w/cmz
# or 
npm i -g @shad02w/cmz
# then commit using 
cmz
```

### Local

```bash
yarn add -D @shad02w/cmz
# then commit using
yarn cmz
```

## Config

Add `cmz.config.js` to the root of workspace and repo, add setup as following: 

```javascript
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
   scope: [
        {
            name: 'app',
            description: 'App for native platform',
        },
        {
            name: 'web',
            description: 'Web application',
        },
        { 
            name: 'shared',
            description: 'Shared code between web and app',
        },
      
    ],
    // Final commit message reolve to
    resolve: ({ commitType, message }) => `(${commitType.name}) ${message}`,
})

```

