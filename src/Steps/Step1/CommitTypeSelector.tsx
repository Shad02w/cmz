import React from 'react'
import { Box, Text } from 'ink'
import type { ItemProps } from 'ink-select-input'
import type { Item } from 'ink-select-input/build/SelectInput'
import type { Props as IndicatorProps } from 'ink-select-input/build/Indicator'
import figures from 'figures'
import { SelectListWithHint } from '../../components/SelectListWithHint'

interface CommitType {
    name: string
    description?: string
}

interface Props {
    commitTypes: CommitType[]
    onSelect: (commitType: CommitType) => void
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

const indicatorComponent = React.memo((props: IndicatorProps) => {
    return (
        <Box marginRight={2}>
            <Text color="magentaBright">{props.isSelected ? figures.pointer : ' '}</Text>
        </Box>
    )
})

export const CommitTypeSelector: React.FC = () => {
    return (
        <SelectListWithHint
            limit={5}
            items={items}
            onSelect={() => console.log('hi')}
            itemComponent={itemComponent}
            indicatorComponent={indicatorComponent}
        />
    )
}
