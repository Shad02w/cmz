import React from 'react'
import { Provider } from 'jotai'
import { render } from 'ink'
import { CommitStepForm } from './CommitStepForm'

const App: React.FC = () => {
    return (
        <Provider>
            <CommitStepForm />
        </Provider>
    )
}

render(<App />)
