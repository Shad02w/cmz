import React from 'react'
import { useAtom } from 'jotai'
import { Steps as UISteps } from '../components/Steps'
import { stepStateAtom } from '../atoms/stepAtom'
import { CommitTypeQuestion, CommitTypeSelector } from './CommitTypeSelector'
import { CommitScopeQuestion, CommitScopeSelector } from './CommitScopeSelector'
import { MessageInput, MessageInputQuestion } from './MessageInput'
import type { StepItem } from '../components/Steps'

const steps: StepItem[] = [
    { question: <CommitTypeQuestion />, content: <CommitTypeSelector /> },
    { question: <CommitScopeQuestion />, content: <CommitScopeSelector /> },
    { question: <MessageInputQuestion />, content: <MessageInput /> },
]

export const CommitStepForm = React.memo(() => {
    const [stepState, setStepState] = useAtom(stepStateAtom)
    React.useEffect(() => {
        // load config
        setStepState({ currentStep: 0, stepLength: steps.length })
    }, [setStepState])
    return <UISteps currentStep={stepState.currentStep} steps={steps} />
})
