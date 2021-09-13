import fs from 'fs/promises'
import Module from 'module'
import { createContext, Script } from 'vm'
import { resolveFilePathInWorkspace } from '../utils/LoaderUtil'
import path from 'path'
import ts from 'typescript'
import type { Config } from './config'

const LoaderUtil = {
    resolveConfigFilePath: resolveFilePathInWorkspace,
}

/**
 * This is the loader for config file
 */

export const CONFIG_FILE_NAME = 'cmz.config'

function getConfigFileType(filePath: string): 'TS' | 'JS' | null {
    const ext = path.extname(filePath)
    return ext === '.ts' ? 'TS' : ext === '.js' ? 'JS' : null
}

async function transpileTsFile(filePath: string) {
    const buffer = await fs.readFile(path.resolve(filePath), { encoding: 'utf-8' })
    return ts.transpile(buffer, {
        target: ts.ScriptTarget.ES2016,
        module: ts.ModuleKind.CommonJS,
        noEmit: true,
        esModuleInterop: true,
        strict: true,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
    })
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
    return mo.exports.default as Config
}

export async function loadConfig(): Promise<Config> {
    const filePath = await LoaderUtil.resolveConfigFilePath(`${CONFIG_FILE_NAME}.js`)
    if (!filePath) {
        throw new Error(`Unable to find config file. Please Add ${CONFIG_FILE_NAME} file to the workspace`)
    } else {
        const fileType = getConfigFileType(filePath)
        if (fileType === 'JS') {
            return loadJSConfig(filePath)
        } else if (fileType === 'TS') {
            throw new Error('Config file in typescript currently is not supported')
        } else {
            throw new Error('Config file should be json, js and ts file')
        }
    }
}
