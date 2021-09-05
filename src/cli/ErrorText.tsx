import { Box, Text } from 'ink'
import React from 'react'

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
