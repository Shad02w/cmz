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



## Configurations

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
    scopes: [
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

You can also define configuration file in Typescirpt , to do that , create a `cmz.config.ts` file and set it up similar to above

```javascript
import { defineConfig } from '@shad02w/cmz'

export default defineConfig({
    // Your config here
})
```

and also install `ts-node`, without `ts-node` the config file will not able to transpile.

If you do not want to put config file on root of the workspace or want a alternative config file name, you can use 

```shell
cmz -c "your config file path here"
```

to specify a config file.

## Options 

```shell
# cmz -h
A simple git commit tool

USAGE
  $ cmz

OPTIONS
  -c, --config=config  custom config file path
  -h, --help           show CLI help
  -v, --version        show CLI version
```



## Contributors

<a>
  <img src = "https://contrib.rocks/image?repo=Shad02w/cmz"/>
</a>
