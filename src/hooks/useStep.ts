import React from 'react'

export const useStep = (steps: StepItem[], onFinish: () => void, onStepChange?: (step: number) => void) => {
    const [currentStep, setCurrentStep] = React.useState(0)

    const nextStep = React.useCallback(
        () =>
            setCurrentStep(step => {
                if (step < steps.length - 1) {
                    const newStep = step + 1
                    onStepChange?.(newStep)
                    return newStep
                } else {
                    onFinish()
                    return step
                }
            }),
        [steps, onStepChange, onFinish]
    )

    const lastStep = React.useCallback(() => {
        setCurrentStep(step => {
            if (step === 0) {
                return step
            } else {
                const newStep = step - 1
                onStepChange?.(newStep)
                return newStep
            }
        })
    }, [onStepChange])

    return { currentStep, nextStep, lastStep }
}
