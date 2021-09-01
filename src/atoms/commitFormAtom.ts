import { atom } from 'jotai'
import type { CommitType, NameWithOptionalDescription } from '../models/Config'

export const commitTypeAtom = atom<CommitType>({ name: '' })
export const workspaceAtom = atom<NameWithOptionalDescription | null>(null)
export const messageAtom = atom('')

export const messageLengthAtom = atom(get => get(messageAtom).length)
