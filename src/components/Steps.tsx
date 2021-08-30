import React from 'react'
import { useStep } from '../hooks/useStep'
import type { StepItem as Item } from '../hooks/useStep'

export type StepItem = Item

export interface StepContext<T> {
    data: T
    currentStep: number
    nextStep: () => void
    updateData: (data: T) => void
}

export interface Props<T> {
    initData: T
    steps: StepItem[]
    onStepsChange: (step: number) => void
}

export const StepsContext = React.createContext({} as StepContext<any>)

export const Steps = function <T>(props: Props<T>) {
    const { initData, steps, onStepsChange } = props

    const { currentStep, nextStep } = useStep(steps, onStepsChange)

    const [data, setData] = React.useState<T>(initData)
    const updateData = React.useCallback((data: T) => setData(data), [])

    return (
        <StepsContext.Provider value={{ data, currentStep, nextStep, updateData }}>
            {steps[currentStep].content}
        </StepsContext.Provider>
    )
}
