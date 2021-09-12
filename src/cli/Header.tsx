import React from 'react'
import packageJson from '../../package.json'
import { Text } from 'ink'

export const Header = React.memo(() => {
    return <Text>Commitz - v{packageJson.version}</Text>
})
