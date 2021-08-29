import React from 'react'
import { Box, Newline, Spacer, Text } from 'ink'

export interface Item {
    label: React.ReactNode
    value: string
}

export interface Props {
    list: Item[]
    value: string
    onChange: (value: string) => void
}

const Select: React.FC<Props> = (props: Props) => {
    const { list, value, onChange } = props

    return (
        <Box flexDirection="column">
            {list.map((item, key) => (
                <Box marginLeft={3} key={key}>
                    <Text color="green">{value === item.value ? '>' : ' '}</Text>
                    <Spacer />
                    {typeof item.label === 'string' ? <Text color="white">{item.value}</Text> : item.label}
                </Box>
            ))}
        </Box>
    )
}

export default Select
