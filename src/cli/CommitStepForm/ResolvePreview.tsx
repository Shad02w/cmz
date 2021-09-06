import figures from 'figures'
import { Text, useInput } from 'ink'
import { atom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import React from 'react'
import { commitMessageAtom, commitScopeAtom, commitTypeAtom } from '../../atoms/commitFormAtom'
import { configAtom } from '../../atoms/configAtom'
import { commit } from '../../libs/commit'

const resolvedCommitMessageAtom = atom(get =>
    get(configAtom).resolve({
        commitType: get(commitTypeAtom),
        scope: get(commitScopeAtom),
        message: get(commitMessageAtom),
    })
)

export const ResolvePreviewConfirm = React.memo(() => {
    const resolvedCommitMessage = useAtomValue(resolvedCommitMessageAtom)
    useInput((_, key) => {
        if (key.return) {
            commit(resolvedCommitMessage)
        }
    })
    return <Text color="gray">Press Enter to Commit</Text>
})

export const ResolvePreviewQuestion = React.memo(() => {
    const resolvedCommitMessage = useAtomValue(resolvedCommitMessageAtom)
    return (
        <Text color="magenta">
            {figures.info}
            {` Commit message preview: `}
            <Text bold backgroundColor="magenta" color="whiteBright">
                {resolvedCommitMessage}
            </Text>
        </Text>
    )
})
