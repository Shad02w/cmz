import fs from 'fs/promises'
import path from 'path'
import { spawnSync } from 'child_process'

async function cleanDistFolder() {
    const distDirectoryPath = path.resolve(__dirname, '../dist')
    let isExisted = false
    try {
        await fs.access(distDirectoryPath)
        isExisted = true
    } catch (e) {
        isExisted = false
    }
    if (isExisted) {
        await fs.rm(distDirectoryPath, { recursive: true, force: true })
    }
    await fs.mkdir(distDirectoryPath)
}

async function copyProjectFiles() {
    const filePath = {
        rootPackageJson: path.resolve(__dirname, '../package.json'),
        distPackageJson: path.resolve(__dirname, '../dist/package.json'),
        rootReadme: path.resolve(__dirname, '../README.md'),
        distReadme: path.resolve(__dirname, '../dist/README.md'),
    }
    try {
        await fs.copyFile(filePath.rootPackageJson, filePath.distPackageJson)
        await fs.copyFile(filePath.rootReadme, filePath.distReadme)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

async function run() {
    // clean dist folder
    await cleanDistFolder()

    const result = spawnSync('babel', ['src', '--out-dir', 'dist', '--extensions .ts,.tsx'], {
        shell: true,
        stdio: 'inherit',
    })

    if (result.error) {
        console.error(result.error)
        process.exit(1)
    }

    await copyProjectFiles()
}

run()
