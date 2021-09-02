import fs from 'fs/promises'
import ts from 'typescript'
import Module from 'module'
import { Script, createContext } from 'vm'
import path from 'path'

const ConfigFileName = 'cmz.config'

function getConfigFileType(filePath: string): 'TS' | 'JS' | null {
    const ext = path.extname(filePath)
    return ext === '.ts' ? 'TS' : ext === '.js' ? 'JS' : null
}

async function resolveConfigFilePath(): Promise<string | null> {
    const searchPaths = module.paths
        .map(path => path.replace(/node_modules/i, ''))
        .flatMap(path => [path + ConfigFileName + '.ts', path + ConfigFileName + '.js'])

    for (const filePath of searchPaths) {
        try {
            await fs.access(filePath)
            return filePath
        } catch (e) {
            // just do nothing, let run to the end of the file
        }
    }
    return null
}

async function transpileTsFile(filePath: string) {
    const buffer = await fs.readFile(path.resolve(process.cwd(), './cmz.config.ts'), { encoding: 'utf-8' })
    return ts.transpile(buffer, {
        target: ts.ScriptTarget.ES2016,
        module: ts.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        strict: true,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
    })
}

async function loadConfig(presetConfigFilePath?: string) {
    const configFilePath: string | null = presetConfigFilePath ?? (await resolveConfigFilePath())
    if (!configFilePath) {
        throw new Error('Config file is not found !!!')
    }
    const configFileType = getConfigFileType(configFilePath)
    console.log(__dirname, __filename)
    if (configFileType === 'TS') {
        const script = new Script(await transpileTsFile(configFilePath))
        const req = Module.createRequire(configFilePath)
        const mo = new Module(configFilePath)
        const sandBox = {
            exports: mo.exports,
            module: mo,
            require: req,
            __filename: configFilePath,
            __dirname: path.dirname(configFilePath),
        }

        const context = createContext(sandBox)
        script.runInContext(context, { timeout: 1000 })
        const config = mo.exports.default
        if (!config) {
            console.error('')
            process.exit(1)
        }

        console.log(config)
    }
}

loadConfig()
