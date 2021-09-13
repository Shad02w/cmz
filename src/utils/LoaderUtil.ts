import path from 'path'
import fs from 'fs/promises'

/**
 * This will resolve the nearest files in workspace folder tree
 */
export async function getNearestFilePath(startDirectory: string, fileName: string): Promise<string | null> {
    const parsed = path.parse(startDirectory)
    const pathClips = [...parsed.dir.replace(parsed.root, '').split(path.sep), parsed.base]

    const searchPaths = pathClips
        .map((_, index) => {
            const clips = pathClips.slice(0, pathClips.length - index)
            return path.join(parsed.root, ...clips)
        })
        .map(resolvedDirectory => path.join(resolvedDirectory, fileName))
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
