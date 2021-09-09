import { spawnSync } from 'child_process'

export function commit(message: string) {
    spawnSync('git', ['commit', '-m', JSON.stringify(message)], { shell: true, stdio: 'inherit' })
    process.exit(1)
}
