import fs from 'fs/promises'
import path from 'path'
import { spawnSync } from 'child_process'

const filePaths = {
    rootPackageJson: path.resolve(__dirname, '../package.json'),
    distPackageJson: path.resolve(__dirname, '../dist/package.json'),
    rootReadme: path.resolve(__dirname, '../README.md'),
    distReadme: path.resolve(__dirname, '../dist/README.md'),
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
}

function runCommand(command: string, args: string[] = []) {
    const result = spawnSync(command, args, {
        shell: true,
        stdio: 'inherit',
    })

    if (result.error) {
        console.error(result.error)
        process.exit(1)
    }
}

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

async function generateDeclarationFiles() {
    runCommand('tsc', ['-P', filePaths.tsconfig])
}

async function transpileSourceCode() {
    runCommand('babel', ['src', '--out-dir', 'dist', '--extensions .ts,.tsx'])
}

async function copyProjectFiles() {
    try {
        await fs.copyFile(filePaths.rootPackageJson, filePaths.distPackageJson)
        await fs.copyFile(filePaths.rootReadme, filePaths.distReadme)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

async function run() {
    await cleanDistFolder()
    await generateDeclarationFiles()
    await transpileSourceCode()
    await copyProjectFiles()
}

run()
