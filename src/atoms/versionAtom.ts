import { atom } from 'jotai'
import { resolveFilePathInWorkspace } from '../utils/LoaderUtil'

export const versionInfoAtom = atom(async () => {
    const packageJsonPath = await resolveFilePathInWorkspace('package.json')
    if (packageJsonPath) {
        try {
            return require(require.resolve(packageJsonPath)).version
        } catch (error) {
            console.log('no package json found')
            return null
        }
    } else {
        return null
    }
})
