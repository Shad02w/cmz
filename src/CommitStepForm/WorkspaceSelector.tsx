import React from 'react'
import { Text } from 'ink'
import { Question } from '../components/Question'
import { SelectListIndicator } from '../components/SelectListIndictor'
import type { ItemProps } from 'ink-select-input/build'
import type { Item } from 'ink-select-input/build/SelectInput'
import { NullableSelectListWithHint } from '../components/NullableSelectListWithHint'
import { useAtomValue, useUpdateAtom } from 'jotai/utils'
import { workspaceAtom } from '../atoms/commitFormAtom'
import { nextStepAtom } from '../atoms/stepAtom'
import { NameWithOptionalDescription } from '../models/Config'

interface Props {}

const items: Item<NameWithOptionalDescription>[] = [
    {
        key: '1',
        label: 'web/game',
        value: {
            name: 'web/game',
        },
    },
    {
        key: '2',
        label: 'web/mobile',
        value: {
            name: 'web/mobile',
        },
    },
]

const itemComponent = React.memo((props: ItemProps) => {
    const { isSelected, label } = props
    return (
        <Text bold color={isSelected ? 'magentaBright' : 'white'}>
            {label}
        </Text>
    )
})

export const WorkspaceSelector = () => {
    const setWorkspace = useUpdateAtom(workspaceAtom)
    const nextStep = useUpdateAtom(nextStepAtom)

    const handleSelect = (item: Item<NameWithOptionalDescription> | null) => {
        setWorkspace(item ? item.value : null)
        nextStep()
    }
    return (
        <NullableSelectListWithHint
            limit={5}
            onSelect={handleSelect}
            items={items}
            itemComponent={itemComponent}
            indicatorComponent={SelectListIndicator}
            nullText="skip"
        />
    )
}

export const WorkspaceQuestion = () => {
    const workspace = useAtomValue(workspaceAtom)
    return <Question question="Select your workspace (Press Enter to skip)" answer={workspace?.name || null} />
}
