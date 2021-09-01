import React from 'react'
import { Steps as UISteps } from '../components/Steps'
import type { StepItem } from '../components/Steps'
import { CommitTypeQuestion, CommitTypeSelector } from './CommitTypeSelector'
import { WorkspaceQuestion, WorkspaceSelector } from './WorkspaceSelector'
import { currentStepAtom, updateCurrentStepAtom } from '../atoms/stepAtom'
import { useAtom } from 'jotai'

interface StepData {
    commitType: string
    workspace: string | null
    message: string
}

const steps: StepItem[] = [
    { question: <CommitTypeQuestion />, content: <CommitTypeSelector /> },
    { question: <WorkspaceQuestion />, content: <WorkspaceSelector /> },
]

const initData: StepData = {
    commitType: '',
    workspace: null,
    message: '',
}

export const Steps = React.memo(() => {
    const [currentStep, a] = useAtom(updateCurrentStepAtom)
    const handleOnFinish = () => {}
    return <UISteps initData={initData} steps={steps} onFinish={handleOnFinish} />
})
