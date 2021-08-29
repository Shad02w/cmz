import { spawnSync } from 'child_process'

spawnSync('babel', ['src', '--out-dir', 'build', '--extensions', '.ts,.tsx'], {
    shell: true,
    stdio: 'inherit',
})
