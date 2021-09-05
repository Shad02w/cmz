import React from 'react'
import { selectAtom, useAtomValue, useUpdateAtom } from 'jotai/utils'
import { Question } from '../../components/Question'
import { nextStepAtom } from '../../atoms/stepAtom'
import { commitTypeAtom } from '../../atoms/commitFormAtom'
import { configAtom } from '../../atoms/configAtom'
import type { NameWithOptionalDescription } from '../../libs/config'
import { CustomSelector } from '../../components/CustomSelector'

const commitTypesConfigAtom = selectAtom(configAtom, config => config.commitTypes)

export const CommitTypeSelector: React.FC = React.memo(() => {
    const commitTypes = useAtomValue(commitTypesConfigAtom)
    const updateCommitType = useUpdateAtom(commitTypeAtom)
    const nextStep = useUpdateAtom(nextStepAtom)

    const handleSelect = (item: NameWithOptionalDescription) => {
        updateCommitType(item)
        nextStep()
    }

    return <CustomSelector list={commitTypes} onSelect={handleSelect} />
})

export const CommitTypeQuestion: React.FC = React.memo(() => {
    const commitType = useAtomValue(commitTypeAtom)
    return <Question question="Select the type of change you want to commit" answer={commitType.name || null} />
})
