import fs from 'fs/promises'
import path from 'path'
import { parse } from 'path/posix'

async function checkFileOrDirectoryExistence(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath)
        return true
    } catch (e) {
        return false
    }
}

/**
 *
 * @param filePath  need to absolute file path
 */
function isInsideWorkspace(filePath: string): boolean {
    return new RegExp(path.parse(process.cwd()).dir).test(filePath)
}

export const PathUtil = Object.freeze({
    checkFileOrDirectoryExistence,
    isInsideWorkspace,
})
