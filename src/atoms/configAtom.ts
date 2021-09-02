import { atom } from 'jotai'
import type { Config } from '../models/Config'
import { loadConfig } from '../libs/loader'

export const configAtom = atom(async () => {
    return await loadConfig()
})
