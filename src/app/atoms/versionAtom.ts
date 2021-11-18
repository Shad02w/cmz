import { atom } from 'jotai'
import { LoaderUtil } from '@utils/LoaderUtil'

export const versionInfoAtom = atom<Promise<string | null>>(async () => {
    const packageJsonPath = await LoaderUtil.getNearestFilePath(__dirname, 'package.json')
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
