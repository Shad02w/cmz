import React from 'react'
import { Box, Spacer, Text } from 'ink'
import figures from 'figures'

export interface Item {
    label: React.ReactNode
    value: string
}

export interface Props {
    list: Item[]
    value: string
    onChange: (value: string) => void
}

export const Select: React.FC<Props> = (props: Props) => {
    const { list, value, onChange } = props
    return (
        <Box>
            {list.map(item => (
                <Box marginLeft={3} key={item.value}>
                    <Text color="green">{value === item.value ? figures.pointer : ' '}</Text>
                    <Spacer />
                    {typeof item.label === 'string' ? <Text color="white">{item.value}</Text> : item.label}
                </Box>
            ))}
        </Box>
    )
}
