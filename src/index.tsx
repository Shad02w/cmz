import React from 'react'
import { render, Text } from 'ink'
import { Select } from './components/Select'
import type { Item as SelectItem } from './components/Select'

const App: React.FC = () => {
    const items: SelectItem[] = [
        {
            label: <Text color="white">Refactor</Text>,
            value: 'refactor',
        },
        {
            label: <Text color="white">Fix</Text>,
            value: 'fix',
        },
    ]
    return <Select list={items} value="refactor" onChange={() => {}} />
}

render(<App />)
