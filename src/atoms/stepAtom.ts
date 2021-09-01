import { atom } from 'jotai'

export interface StepState {
    currentStep: number
    stepLength: number
}

const initStepState: StepState = {
    currentStep: 0,
    stepLength: 0,
}

export const stepStateAtom = atom(initStepState)

export const currentStepAtom = atom(get => get(stepStateAtom).currentStep)

export const nextStepAtom = atom(null, (get, set) => {
    const { currentStep, stepLength } = get(stepStateAtom)
    if (currentStep < stepLength - 1) {
        set(stepStateAtom, { stepLength, currentStep: currentStep + 1 })
    }
})

export const lastStepAtom = atom(null, (get, set) => {
    const { currentStep, stepLength } = get(stepStateAtom)
    if (currentStep == 0) {
        set(stepStateAtom, { stepLength, currentStep: currentStep + 1 })
    }
})
