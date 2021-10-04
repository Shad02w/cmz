import React from 'react'
import { Text } from 'ink'
import Spinner from 'ink-spinner'

interface Props {}

export const Loading = (props: Props) => {
    return (
        <Text>
            <Text color="green">
                <Spinner type="dots6" />
            </Text>
            {' Loading config...'}
        </Text>
    )
}
