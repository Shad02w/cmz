import React from 'react'
import { Box, Newline, Text, useInput } from 'ink'
import { useAtom } from 'jotai'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { lastStepAtom, stepStateAtom } from '../../atoms/stepAtom'
import { configAtom } from '../../atoms/configAtom'
import { Steps as UISteps } from '../../components/Steps'
import { CommitTypeQuestion, CommitTypeSelector } from './CommitTypeSelector'
import { CommitScopeQuestion, CommitScopeSelector } from './CommitScopeSelector'
import { MessageInput, MessageInputQuestion } from './MessageInput'
import { ResolvePreviewConfirm, ResolvePreviewQuestion } from './ResolvePreview'
import type { StepItem } from '../../components/Steps'

export const CommitStepForm = React.memo(() => {
    const config = useAtomValue(configAtom)
    const [stepState, setStepState] = useAtom(stepStateAtom)
    const lastStep = useUpdateAtom(lastStepAtom)

    useInput((_, input) => {
        if (input.escape) {
            lastStep()
        }
    })

    const steps: StepItem[] = React.useMemo(
        () => [
            { question: <CommitTypeQuestion />, content: <CommitTypeSelector /> },
            ...(config.scopes ? [{ question: <CommitScopeQuestion />, content: <CommitScopeSelector /> }] : []),
            { question: <MessageInputQuestion />, content: <MessageInput /> },
            { question: <ResolvePreviewQuestion />, content: <ResolvePreviewConfirm /> },
        ],
        [config]
    )

    React.useEffect(() => {
        setStepState({ currentStep: 0, stepLength: steps.length })
    }, [setStepState, steps])

    return (
        <Box flexDirection="column">
            <UISteps currentStep={stepState.currentStep} steps={steps} />
            {stepState.currentStep !== 0 && (
                <React.Fragment>
                    <Newline />
                    <Text color="gray">Press ESC would go back to last step</Text>
                </React.Fragment>
            )}
        </Box>
    )
})
