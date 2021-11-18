import { atom } from 'jotai'
import { resolveConfig } from '@libs/loader'

export const initConfigPathAtom = atom<string | undefined>(undefined)

export const configAtom = atom(async get => {
    const initConfigPath = get(initConfigPathAtom)
    return resolveConfig(initConfigPath)
})
