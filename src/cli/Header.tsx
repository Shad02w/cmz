import React from 'react'
import { Text } from 'ink'
import { VersionInfo } from './VersionInfo'

export const Header = React.memo(() => {
    return (
        <Text>
            Commitz
            <React.Suspense fallback={null}>
                <VersionInfo />
            </React.Suspense>
        </Text>
    )
})
