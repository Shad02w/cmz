import React from 'react'
import { Box, Text } from 'ink'
import { Question } from '../components/Question'
import TextInput from 'ink-text-input'
import { commitMessageAtom } from '../atoms/commitFormAtom'
import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'

export const MessageInput = React.memo(() => {
    const [message, setMessage] = useAtom(commitMessageAtom)
    const [draft, setDraft] = React.useState(message)

    return (
        <Box flexDirection="row">
            <Text color="green">{`(${draft.length}) `}</Text>
            <TextInput value={draft} onChange={setDraft} onSubmit={setMessage} />
        </Box>
    )
})

export const MessageInputQuestion = React.memo(() => {
    const message = useAtomValue(commitMessageAtom)
    return <Question question="Enter the commit message" answer={message || null} />
})
