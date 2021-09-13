import fs from 'fs/promises'
import Module from 'module'
import { createContext, Script } from 'vm'
import { getNearestFilePath, requireTSFile, requireJSFile } from '../utils/LoaderUtil'
import path from 'path'
import type { Config } from './config'

const LoaderUtil = {
    getNearestFilePath,
    requireTSFile,
    requireJSFile,
}

/**
 * This is the loader for config file
 */

export const CONFIG_FILE_NAME = 'cmz.config'

function getConfigFileType(filePath: string): 'TS' | 'JS' | null {
    const ext = path.extname(filePath)
    return ext === '.ts' ? 'TS' : ext === '.js' ? 'JS' : null
}
async function loadJSConfig(filePath: string): Promise<Config> {
    return (await LoaderUtil.requireJSFile(filePath)) as Config
}

async function loadTSConfig(filePath: string): Promise<Config> {
    const req = Module.createRequire(filePath)
    const mo = new Module(filePath)

    try {
        req.resolve('ts-node')
    } catch (error) {
        throw new Error('Module `ts-node` is needed to load config in typescript')
    }

    const script = new Script(await LoaderUtil.requireTSFile(filePath))
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
    const filePath = await LoaderUtil.getNearestFilePath(process.cwd(), [
        `${CONFIG_FILE_NAME}.ts`,
        `${CONFIG_FILE_NAME}.js`,
    ])

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
