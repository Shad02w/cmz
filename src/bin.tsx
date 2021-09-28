#!/usr/bin/env node
import React from 'react'
import { render } from 'ink'
import { CLI } from './app'
import { CMZCli } from './cli'
import type { Options } from './cli'
import { handle } from '@oclif/errors'

async function main() {
    try {
        const { configPath } = (await CMZCli.run()) as Options
        render(<CLI configPath={configPath} />)
    } catch (error) {
        handle(error as any)
    }
}

main()
