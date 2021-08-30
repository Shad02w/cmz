import React from 'react'
import figures from 'figures'
import { Box, Text } from 'ink'
import SelectInput from 'ink-select-input'
import type { Item } from 'ink-select-input/build/SelectInput'
import type { Props as IndicatorProps } from 'ink-select-input/build/Indicator'
import type { Props as ItemProps } from 'ink-select-input/build/Item'

interface Props<V> {
    items?: Array<Item<V>>
    isFocused?: boolean
    initialIndex?: number
    limit?: number
    indicatorComponent?: React.FC<IndicatorProps>
    itemComponent?: React.FC<ItemProps>
    onSelect?: (item: Item<V>) => void
    onHighlight?: (item: Item<V>) => void
}

export function SelectListWithHint<T>(props: Props<T>) {
    return (
        <Box flexDirection="column">
            <Text color="green">
                <Text bold>{figures.questionMarkPrefix}</Text> Use ({figures.arrowUp},{figures.arrowDown}) or (j,k) to
                navigate this list
            </Text>
            <SelectInput {...props} />
        </Box>
    )
}
