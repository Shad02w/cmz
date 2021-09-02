import fs from 'fs/promises'
import ts from 'typescript'
import path from 'path'
// This is the loader for config file

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

async function loadJSConfig(filePath: string) {
    const config = require(filePath)
}

async function loadTSConfig(filePath: string) {}

export async function loadConfig(): Promise<string> {
    const filePath = await resolveConfigFilePath()
    if (!filePath) {
        console.error(`Unable to find config file. Please Add ${CONFIG_FILE_NAME} file to the workspace`)
        process.exit(1)
    } else {
        return '123'
    }
}
