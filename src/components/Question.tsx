import React from 'react'
import { Text, Box } from 'ink'
import figures from 'figures'

interface Props {
    question: string
    answer: React.ReactNode
}

export const Question = (props: Props) => {
    const { question, answer } = props
    return (
        <Box flexDirection="row">
            <Text color="green">
                <Text bold>{figures.questionMarkPrefix}</Text>
                {` ${question}: `}
            </Text>
            {answer}
        </Box>
    )
}
