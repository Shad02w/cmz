import React from 'react'
import { Text } from 'ink'
import { Question } from '../../components/Question'
import type { ItemProps } from 'ink-select-input/build'
import { selectAtom, useAtomValue, useUpdateAtom } from 'jotai/utils'
import { commitScopeAtom } from '../../atoms/commitFormAtom'
import { nextStepAtom } from '../../atoms/stepAtom'
import { NameWithOptionalDescription } from '../../libs/config'
import { configAtom } from '../../atoms/configAtom'
import { CustomSelector } from '../../components/CustomSelector'
import { NullableCustomSelector } from '../../components/CustomSelector/NullableCustomSelector'

const commitScopeConfigAtom = selectAtom(configAtom, config => config.scopes)

export const CommitScopeSelector = React.memo(() => {
    const commitScopes = useAtomValue(commitScopeConfigAtom)
    const setScope = useUpdateAtom(commitScopeAtom)
    const nextStep = useUpdateAtom(nextStepAtom)

    const handleSelect = (item: NameWithOptionalDescription | null) => {
        setScope(item)
        nextStep()
    }
    return commitScopes ? <NullableCustomSelector list={commitScopes} onSelect={handleSelect} nullLabel="skip" /> : null
})

export const CommitScopeQuestion = React.memo(() => {
    const scope = useAtomValue(commitScopeAtom)
    return <Question question="Select your scope" answer={scope?.name || null} />
})
