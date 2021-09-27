import React from 'react'
import { Box, Text } from 'ink'

export const ErrorText = (error: Error) => {
    return (
        <Box flexDirection="column">
            <Text bold color="red">
                {`[!] `}
                <Text>{error.message}</Text>
            </Text>
            {error.stack && <Text>{error.stack}</Text>}
        </Box>
    )
}
