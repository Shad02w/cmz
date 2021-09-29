import fs from 'fs/promises'
import path from 'path'
import { spawnSync } from 'child_process'
import figures from 'figures'

const filePaths = {
    rootPackageJson: path.resolve(__dirname, '../package.json'),
    distPackageJson: path.resolve(__dirname, '../dist/package.json'),
    rootReadme: path.resolve(__dirname, '../README.md'),
    distReadme: path.resolve(__dirname, '../dist/README.md'),
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
}

function runCommand(description: string, command: string, args: string[] = []) {
    console.log('\x1b[32m%s\x1b[0m%s', figures.tick, ` ${description}`)

    const result = spawnSync(command, args, {
        shell: true,
        stdio: 'inherit',
    })

    if (result.error) {
        console.error(result.error)
        process.exit(1)
    }

    console.log('\n')
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
    runCommand('Generate Declaration File', 'ttsc', ['-P', filePaths.tsconfig])
}

async function transpileSourceCode() {
    runCommand('Transpile Source Code', 'babel', ['./src', '-d', 'dist/lib', '--extensions .ts,.tsx'])
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
