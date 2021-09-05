import React from 'react'
import { render } from 'ink'
import { Provider } from 'jotai'
import { Box, Newline } from 'ink'
import { CommitStepForm } from './cli/CommitStepForm'
import { Header } from './cli/Header'
import { Loading } from './cli/Loading'
import { ErrorBoundary } from './components/ErrorBoundary'
import { ErrorText } from './cli/ErrorText'

const CLI: React.FC = () => {
    return (
        <ErrorBoundary errorRender={ErrorText}>
            <Provider>
                <Box flexDirection="column">
                    <Header />
                    <Newline />
                    <React.Suspense fallback={<Loading />}>
                        <CommitStepForm />
                    </React.Suspense>
                </Box>
            </Provider>
        </ErrorBoundary>
    )
}

render(<CLI />)
