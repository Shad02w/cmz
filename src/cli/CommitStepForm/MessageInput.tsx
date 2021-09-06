import React from 'react'
import { Box, Text } from 'ink'
import { Question } from '../../components/Question'
import TextInput from 'ink-text-input'
import { commitMessageAtom } from '../../atoms/commitFormAtom'
import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { nextStepAtom } from '../../atoms/stepAtom'

export const MessageInput = React.memo(() => {
    const [message, setMessage] = useAtom(commitMessageAtom)
    const nextStep = useUpdateAtom(nextStepAtom)

    const [draft, setDraft] = React.useState(message)

    const handleSubmit = (value: string) => {
        setMessage(value)
        nextStep()
    }

    return (
        <Box flexDirection="row">
            <Text color="green">{`(${draft.length}) `}</Text>
            <TextInput value={draft} onChange={setDraft} onSubmit={handleSubmit} />
        </Box>
    )
})

export const MessageInputQuestion = React.memo(() => {
    const message = useAtomValue(commitMessageAtom)
    return <Question question="Enter the commit message" answer={message || null} />
})
