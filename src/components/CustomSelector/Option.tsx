import { Box, Text } from 'ink'
import React from 'react'
import { NameWithOptionalDescription } from '../../libs/config'

interface Props {
    name: string
    description?: string
    highlighted: boolean
}

export const Option: React.FC<Props> = React.memo((props: Props) => {
    const { name, description, highlighted } = props
    return (
        <Box>
            <Text color={highlighted ? 'magentaBright' : 'white'}>
                <Text bold>{`${name}${description ? ': ' : ''} `}</Text>
                {description && <Text color={highlighted ? 'magenta' : 'gray'}>{description}</Text>}
            </Text>
        </Box>
    )
})
