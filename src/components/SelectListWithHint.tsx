import React from 'react'
import { Box, Text } from 'ink'
import SelectInput, { IndicatorProps, ItemProps } from 'ink-select-input/build'
import type { Item } from 'ink-select-input/build/SelectInput'
import figures from 'figures'

export interface Props<V> {
    items: Array<Item<V>>
    onSelect: (item: Item<V>) => void
    isFocused?: boolean
    initialIndex?: number
    limit?: number
    indicatorComponent?: React.FC<IndicatorProps>
    itemComponent?: React.FC<ItemProps>
    onHighlight?: (item: Item<V>) => void
}

export const SelectListWithHint = function <V>(props: Props<V>) {
    return (
        <Box flexDirection="column">
            <Text color="gray">
                Use ({figures.arrowUp},{figures.arrowDown}) or (j,k) to navigate this list
            </Text>
            <SelectInput {...props} />
        </Box>
    )
}
