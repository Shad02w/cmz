import React from 'react'
import { Box, Text } from 'ink'
import { Question } from '../components/Question'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { UncontrolledTextInput } from 'ink-text-input'
import { messageAtom, messageLengthAtom } from '../atoms/commitFormAtom'

export const MessageInput = React.memo(() => {
    const setMessage = useUpdateAtom(messageAtom)
    const messageLength = useAtomValue(messageLengthAtom)
    return (
        <Box flexDirection="row">
            <Text color="green">({messageLength})</Text>
            <UncontrolledTextInput onSubmit={setMessage} />
        </Box>
    )
})

export const MessageInputQuestion = React.memo(() => {
    const message = useAtomValue(messageAtom)
    return <Question question="Enter the commit message" answer={message || null} />
})
