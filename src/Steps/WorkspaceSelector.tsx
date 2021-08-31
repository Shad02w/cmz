import React from 'react'
import { Box, Text } from 'ink'
import { Question } from '../components/Question'
import { SelectListIndicator } from '../components/SelectListIndictor'
import { SelectListWithHint } from '../components/SelectListWithHint'
import type { ItemProps } from 'ink-select-input/build'
import type { Item } from 'ink-select-input/build/SelectInput'
import { NullableSelectListWithHint } from '../components/NullableSelectListWithHint'
import { StepsContext } from '../components/Steps'

interface Props {}

const items: Item<string>[] = [
    {
        label: 'web/game',
        value: 'web/game',
    },
    {
        label: 'web/mobile',
        value: 'web/mobile',
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

export const WorkspaceSelector = (props: Props) => {
    const { nextStep } = React.useContext(StepsContext)
    return (
        <NullableSelectListWithHint
            limit={5}
            onSelect={nextStep}
            items={items}
            itemComponent={itemComponent}
            indicatorComponent={SelectListIndicator}
            nullText="skip"
        />
    )
}

export const WorkspaceQuestion = () => {
    return <Question question="Select your workspace (Press Enter to skill)" answer={null} />
}
