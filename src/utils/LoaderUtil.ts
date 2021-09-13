import path from 'path'
import fs from 'fs/promises'
import ts from 'typescript'

/**
 * This will resolve the nearest files in workspace folder tree
 */
export async function getNearestFilePath(startDirectory: string, fileNames: string | string[]): Promise<string | null> {
    const parsed = path.parse(startDirectory)
    const pathClips = [...parsed.dir.replace(parsed.root, '').split(path.sep), parsed.base]
    const files = typeof fileNames === 'string' ? [fileNames] : fileNames

    const searchPaths = pathClips
        .map((_, index) => {
            const clips = pathClips.slice(0, pathClips.length - index)
            return path.join(parsed.root, ...clips)
        })
        .map(resolvedDirectory => files.map(_ => path.join(resolvedDirectory, _)))
        .flatMap(_ => _)
        .filter(_ => path.isAbsolute(_))

    return await checkFileOrDirectoryExistence(searchPaths)
}

/**
 * Return the first file or director the exist in paths array, if none of them exist, return null
 */
export async function checkFileOrDirectoryExistence(paths: string[]): Promise<string | null> {
    for (const path of paths) {
        try {
            await fs.access(path)
            return path
        } catch (e) {
            // do nothing
        }
    }
    return null
}

export async function requireJSFile(filePath: string): Promise<any> {
    return require(filePath)
}

export async function transpileTsFile(filePath: string): Promise<string> {
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

export async function requireTSFile(filePath: string) {
    return `require('ts-node').register({
        transpileOnly: true,
    })
    
    ${await transpileTsFile(filePath)}`
}
