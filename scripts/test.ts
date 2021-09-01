import { readFile } from 'fs/promises'

import ts from 'typescript'
import path from 'path'

async function run() {
    try {
        const buffer = await readFile(path.resolve(process.cwd(), './cmz.config.ts'), { encoding: 'utf-8' })
        const result = ts.transpile(buffer.toString(), {
            target: ts.ScriptTarget.ES5,
            module: ts.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
            strict: true,
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
        })

        console.log(result)
    } catch (error) {
        console.error(error)
    }
}

run()
