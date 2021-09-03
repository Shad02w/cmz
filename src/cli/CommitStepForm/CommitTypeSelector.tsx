import React from 'react'
import { selectAtom, useAtomValue, useUpdateAtom } from 'jotai/utils'
import { Box, Text } from 'ink'
import type { ItemProps } from 'ink-select-input'
import type { Item } from 'ink-select-input/build/SelectInput'
import { Question } from '../../components/Question'
import { SelectListIndicator } from '../../components/SelectListIndictor'
import { SelectListWithHint } from '../../components/SelectListWithHint'
import { nextStepAtom } from '../../atoms/stepAtom'
import { commitTypeAtom } from '../../atoms/commitFormAtom'
import { configAtom } from '../../atoms/configAtom'
import type { CommitType } from '../../models/Config'

const commitTypesConfigAtom = selectAtom(configAtom, config => config.commitTypes)

const CommitTypeOption = React.memo((props: { commitType: CommitType; highlighted: boolean }) => {
    const { commitType, highlighted } = props
    return (
        <Box>
            <Text color={highlighted ? 'magentaBright' : 'white'}>
                <Text bold>{`${commitType.name}: `}</Text>
                {commitType.description && (
                    <Text color={highlighted ? 'magenta' : 'gray'}>{commitType.description}</Text>
                )}
            </Text>
        </Box>
    )
})

export const CommitTypeSelector: React.FC = React.memo(() => {
    const commitTypes = useAtomValue(commitTypesConfigAtom)
    const updateCommitType = useUpdateAtom(commitTypeAtom)
    const nextStep = useUpdateAtom(nextStepAtom)

    const items: Item<CommitType>[] = React.useMemo(
        () =>
            commitTypes.map((commit, index) => ({
                key: index.toString(),
                label: commit.name,
                value: commit,
            })),
        [commitTypes]
    )

    const itemComponent = (props: ItemProps) => {
        const { label, isSelected } = props
        const commit = items.find(_ => _.label === label)!
        return (
            <CommitTypeOption
                commitType={{ name: label, description: commit?.value.description }}
                highlighted={isSelected === true}
            />
        )
    }

    const handleSelect = (item: Item<CommitType>) => {
        updateCommitType(item.value)
        nextStep()
    }

    return (
        <SelectListWithHint
            limit={5}
            items={items}
            onSelect={handleSelect}
            itemComponent={itemComponent}
            indicatorComponent={SelectListIndicator}
        />
    )
})

export const CommitTypeQuestion: React.FC = React.memo(() => {
    const commitType = useAtomValue(commitTypeAtom)
    return <Question question="Select the type of change you want to commit" answer={commitType.name || null} />
})
