import React from 'react'
import { useStep } from '../hooks/useStep'
import type { StepItem as Item } from '../hooks/useStep'
import { Box } from 'ink'

export type StepItem = Item

export interface StepContext<T> {
    data: T
    currentStep: number
    nextStep: () => void
    lastStep: () => void
    updateData: (data: T) => void
}

export interface Props<T> {
    initData: T
    steps: StepItem[]
    onFinish: () => void
    onStepChange?: (step: number) => void
}

export const StepsContext = React.createContext({} as StepContext<any>)

export const Steps = function <T>(props: Props<T>) {
    const { initData, steps, onStepChange, onFinish } = props

    const { currentStep, nextStep, lastStep } = useStep(steps, onFinish, onStepChange)

    const [data, setData] = React.useState<T>(initData)
    const updateData = React.useCallback((data: T) => setData(data), [])

    return (
        <StepsContext.Provider value={{ data, currentStep, nextStep, lastStep, updateData }}>
            <Box flexDirection="column">
                {steps.slice(0, currentStep + 1).map((step, key) => (
                    <Box key={key}>{step.question}</Box>
                ))}
            </Box>
            {steps[currentStep].content}
        </StepsContext.Provider>
    )
}
