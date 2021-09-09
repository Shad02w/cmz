import React from 'react'
import { useAtom } from 'jotai'
import { useAtomValue } from 'jotai/utils'
import { stepStateAtom } from '../../atoms/stepAtom'
import { configAtom } from '../../atoms/configAtom'
import { Steps as UISteps } from '../../components/Steps'
import { CommitTypeQuestion, CommitTypeSelector } from './CommitTypeSelector'
import { CommitScopeQuestion, CommitScopeSelector } from './CommitScopeSelector'
import { MessageInput, MessageInputQuestion } from './MessageInput'
import { ResolvePreviewConfirm, ResolvePreviewQuestion } from './ResolvePreview'
import type { StepItem } from '../../components/Steps'

export const CommitStepForm = React.memo(() => {
    const config = useAtomValue(configAtom)

    const steps: StepItem[] = React.useMemo(
        () => [
            { question: <CommitTypeQuestion />, content: <CommitTypeSelector /> },
            ...(config.scope ? [{ question: <CommitScopeQuestion />, content: <CommitScopeSelector /> }] : []),
            { question: <MessageInputQuestion />, content: <MessageInput /> },
            { question: <ResolvePreviewQuestion />, content: <ResolvePreviewConfirm /> },
        ],
        [config]
    )
    const [stepState, setStepState] = useAtom(stepStateAtom)

    React.useEffect(() => {
        // load config
        setStepState({ currentStep: 0, stepLength: steps.length })
    }, [setStepState, steps])

    return <UISteps currentStep={stepState.currentStep} steps={steps} />
})
