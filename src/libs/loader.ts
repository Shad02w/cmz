import fs from 'fs/promises'
import Module from 'module'
import { createContext, Script } from 'vm'
import path from 'path'
import ts from 'typescript'
import type { Config } from './config'

/**
 * This is the loader for config file
 */

export const CONFIG_FILE_NAME = 'cmz.config'

function getConfigFileType(filePath: string): 'TS' | 'JS' | null {
    const ext = path.extname(filePath)
    return ext === '.ts' ? 'TS' : ext === '.js' ? 'JS' : null
}

async function resolveConfigFilePath(): Promise<string | null> {
    const searchPaths = module.paths
        .map(path => path.replace(/node_modules/i, ''))
        .flatMap(path => [path + CONFIG_FILE_NAME + '.ts', path + CONFIG_FILE_NAME + '.js'])

    Promise.any

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

async function verifyConfig() {
    // verify config
}

async function loadJSConfig(filePath: string): Promise<Config> {
    return require(filePath) as Config
}

async function loadTSConfig(filePath: string): Promise<Config> {
    const script = new Script(await transpileTsFile(filePath))
    const req = Module.createRequire(filePath)
    const mo = new Module(filePath)
    const sandBox = {
        exports: mo.exports,
        module: mo,
        require: req,
        __filename: filePath,
        __dirname: path.dirname(filePath),
    }

    const context = createContext(sandBox)
    script.runInContext(context, { timeout: 1000 })
    // TODO verify is needed
    return mo.exports.default as Config
}

export async function loadConfig(): Promise<Config> {
    const filePath = await resolveConfigFilePath()
    if (!filePath) {
        throw new Error(`Unable to find config file. Please Add ${CONFIG_FILE_NAME} file to the workspace`)
    } else {
        const fileType = getConfigFileType(filePath)
        if (fileType === 'JS') {
            return loadJSConfig(filePath)
        } else if (fileType === 'TS') {
            return loadTSConfig(filePath)
        } else {
            throw new Error('Config file should be json, js and ts file')
        }
    }
}
