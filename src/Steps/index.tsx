import React from 'react'
import { Steps as UISteps } from '../components/Steps'
import type { StepItem } from '../components/Steps'
import { Step1 } from './Step1'

interface StepData {
    commitType: string
    workspace: string | null
    message: string
}
const steps: StepItem[] = [{ content: <Step1 /> }]

const initData: StepData = {
    commitType: '',
    workspace: null,
    message: '',
}

export const Steps = () => {
    return <UISteps initData={initData} steps={steps} onStepsChange={() => {}} />
}
