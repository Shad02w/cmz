import { atom } from 'jotai'
import type { CommitType, NameWithOptionalDescription } from '@libs/config'

export const commitTypeAtom = atom<CommitType>({ name: '' })
export const commitScopeAtom = atom<NameWithOptionalDescription | null>(null)
export const commitMessageAtom = atom<string>('')
