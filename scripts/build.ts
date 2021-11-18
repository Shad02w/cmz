import fs from 'fs/promises'
import path from 'path'
import { spawn, spawnSync } from 'child_process'
import figures from 'figures'

const filePaths = {
    rootPackageJson: path.resolve(__dirname, '../package.json'),
    distPackageJson: path.resolve(__dirname, '../dist/package.json'),
    rootReadme: path.resolve(__dirname, '../README.md'),
    distReadme: path.resolve(__dirname, '../dist/README.md'),
    tsconfig: path.resolve(__dirname, '../tsconfig.json'),
}

function logTitle(description: string) {
    console.log('\x1b[32m%s\x1b[0m%s', figures.circleFilled, ` ${description}`)
}

async function runCommand(description: string, command: string, args: string[] = []) {
    return new Promise<void>((resolve, reject) => {
        logTitle(description)
        const child = spawn(command, args, {
            shell: true,
            stdio: 'inherit',
        })
        child.on('error', e => {
            reject(e)
        })

        child.on('exit', code => {
            resolve()
            if (code !== 0) {
                process.exit(1)
            }
        })
    })
}

function runAsync(description: string, process: () => Promise<void> | void): () => Promise<void> {
    return async () => {
        logTitle(description)
        await process()
    }
}

async function generateDeclarationFiles() {
    return runCommand('Generate Declaration File', 'ttsc', ['-P', filePaths.tsconfig])
}

async function transpileSourceCode() {
    return runCommand('Transpile Source Code', 'babel', ['./src', '-d', 'dist/lib', '--extensions .ts,.tsx'])
}

const cleanDistFolder = runAsync('Clean up build folder', async () => {
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
})

const copyProjectFiles = runAsync('Copy project files', async () => {
    try {
        await fs.copyFile(filePaths.rootPackageJson, filePaths.distPackageJson)
        await fs.copyFile(filePaths.rootReadme, filePaths.distReadme)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
})

async function run() {
    try {
        await cleanDistFolder()
        await generateDeclarationFiles()
        await transpileSourceCode()
        await copyProjectFiles()
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
}

run()
