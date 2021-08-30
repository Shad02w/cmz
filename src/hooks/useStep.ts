import React from 'react'

export interface StepItem {
    content: React.ReactChild | null
}

export const useStep = (steps: StepItem[], onStepChange: (step: number, ended: boolean) => void) => {
    const [currentStep, setCurrentStep] = React.useState(0)

    const nextStep = React.useCallback(
        () =>
            setCurrentStep(step => {
                if (step < steps.length) {
                    const nextStep = step + 1
                    onStepChange(nextStep, nextStep === steps.length - 1)
                    return step + 1
                }
                return step
            }),
        [steps, onStepChange]
    )

    return { currentStep, nextStep }
}
