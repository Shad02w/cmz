import React from 'react'
import { Provider } from 'jotai'
import { Box, Newline } from 'ink'
import { CommitStepForm } from './CommitStepForm'
import { Header } from './Header'
import { ErrorText } from './ErrorText'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { Loading } from './Loading'

export const CLI: React.FC = () => {
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
