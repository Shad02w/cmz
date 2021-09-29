import { Command, flags } from '@oclif/command'

export interface Options {
    configPath?: string
}

export class CMZCli extends Command {
    static description = 'A simple git commit tool'

    static flags = {
        version: flags.version({ char: 'v' }),
        config: flags.string({ char: 'c', description: 'path of cmz config file' }),
        help: flags.help({ char: 'h' }),
    }

    async run(): Promise<Options> {
        const {
            flags: { config },
        } = this.parse(CMZCli)
        return {
            configPath: config,
        }
    }
}
