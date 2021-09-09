import { spawnSync } from 'child_process'

export function commit(message: string) {
    const result = spawnSync('git', ['commit', '-m', JSON.stringify(message)], { shell: true, stdio: 'inherit' })
    if (result.status === null || result.status != 0) {
        process.exit(1)
    }
    process.exit(0)
}
