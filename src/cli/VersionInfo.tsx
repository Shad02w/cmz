import React from 'react'
import { Text } from 'ink'
import { useAtomValue } from 'jotai/utils'
import { versionInfoAtom } from '../atoms/versionAtom'

export const VersionInfo = React.memo(() => {
    const versionInfo = useAtomValue(versionInfoAtom)
    return versionInfo ? <Text>{` - v${versionInfo}`}</Text> : null
})
