import React from 'react'
import { Box, Text } from 'ink'
import { Question } from '../components/Question'
import { Input } from '../components/Input'
import { commitMessageAtom } from '../atoms/commitFormAtom'
import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { nextStepAtom } from '@atoms/stepAtom'

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
            <Text color="green">{`(${draft.length.toString().padStart(2, '0')}) `}</Text>
            <Input
                value={draft}
                onChange={setDraft}
                onSubmit={handleSubmit}
                placeholder="Enter your commit message here"
            />
        </Box>
    )
})

export const MessageInputQuestion = React.memo(() => {
    const message = useAtomValue(commitMessageAtom)
    return <Question question="Enter the commit message" answer={message || null} />
})
