import React from 'react'
import Spinner from 'ink-spinner'
import { Text } from 'ink'

export const Loading = () => {
    return (
        <Text>
            <Text color="green">
                <Spinner type="dots" />
            </Text>
            {' Loading config...'}
        </Text>
    )
}
