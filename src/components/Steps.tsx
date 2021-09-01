import React from 'react'
import { Box } from 'ink'

export interface StepItem {
    question: React.ReactChild
    content: React.ReactChild
}
export interface Props<T> {
    steps: StepItem[]
    currentStep: number
    initData: T
}

export const Steps = function <T>(props: Props<T>) {
    const { currentStep, initData, steps } = props

    return (
        <Box flexDirection="column">
            {steps.slice(0, currentStep + 1).map((step, key) => (
                <Box key={key}>{step.question}</Box>
            ))}
            {steps[currentStep].content}
        </Box>
    )
}
