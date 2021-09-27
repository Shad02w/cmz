import { atom } from 'jotai'
import { loadConfig } from '@libs/loader'

export const configAtom = atom(async () => {
    return await loadConfig()
})
