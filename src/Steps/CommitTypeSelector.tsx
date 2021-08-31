import React from 'react'
import { Box, Text } from 'ink'
import type { ItemProps } from 'ink-select-input'
import type { Item } from 'ink-select-input/build/SelectInput'
import { Question } from '../components/Question'
import { SelectListIndicator } from '../components/SelectListIndictor'
import { SelectListWithHint } from '../components/SelectListWithHint'
import { StepsContext } from '../components/Steps'

interface CommitType {
    name: string
    description?: string
}

const Commits: CommitType[] = [
    {
        name: 'Refactor',
        description: 'A code change that neither fixes a bug nor adds a feature',
    },
    {
        name: 'Fix',
        description: 'A bug fix',
    },
    {
        name: 'Upgrade',
        description: 'Upgraded the dependencies of repo ',
    },
]

const items: Item<CommitType>[] = Commits.map((commit, index) => ({
    key: index.toString(),
    label: commit.name,
    value: commit,
}))

const itemComponent = React.memo((props: ItemProps) => {
    const { label, isSelected } = props
    const commit = items.find(_ => _.label === label)!
    return (
        <Box>
            <Text color={isSelected ? 'magentaBright' : 'white'}>
                <Text bold>{`${commit.label}: `}</Text>
                {commit.value.description && (
                    <Text color={isSelected ? 'magenta' : 'gray'}>{commit.value.description}</Text>
                )}
            </Text>
        </Box>
    )
})

export const CommitTypeSelector: React.FC = React.memo(() => {
    const { nextStep } = React.useContext(StepsContext)

    const handleSelect = () => {}
    return (
        <SelectListWithHint
            limit={5}
            items={items}
            onSelect={nextStep}
            itemComponent={itemComponent}
            indicatorComponent={SelectListIndicator}
        />
    )
})

export const CommitTypeQuestion: React.FC = React.memo(() => {
    return <Question question="Select the type of change you want to commit" answer={null} />
})
