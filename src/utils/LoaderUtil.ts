import path from 'path'
import fs from 'fs/promises'

const CONFIG_FILE_NAME = 'cmz.config'

export async function resolveConfigFilePath(): Promise<string | null> {
    const pathsClip = process.cwd().split(path.sep)

    const searchPaths = pathsClip
        .map((_, index) => {
            const clips = pathsClip.slice(0, pathsClip.length - index)
            if (clips.length === 1) {
                return clips[0]
            } else {
                return path.join(...clips)
            }
        })
        .map(resolvedDirectory => path.join(resolvedDirectory, `${CONFIG_FILE_NAME}.js`))

    return await checkFileOrDirectoryExistence(searchPaths)
}

async function checkFileOrDirectoryExistence(paths: string[]): Promise<string | null> {
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
