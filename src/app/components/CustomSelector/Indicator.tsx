import React from 'react'
import { Box, Text } from 'ink'
import figures from 'figures'
import type { Props as IndicatorProps } from 'ink-select-input/build/Indicator'

export const Indicator = React.memo((props: IndicatorProps) => {
    return (
        <Box marginRight={2}>
            <Text color="magentaBright">{props.isSelected ? figures.pointer : ' '}</Text>
        </Box>
    )
})
