import React from 'react'
import { Provider } from 'jotai'
import { Box, Newline } from 'ink'
import { CommitStepForm } from './CommitStepForm'
import { Header } from './Header'
import { ErrorText } from './ErrorText'
import { ErrorBoundary } from '@components/ErrorBoundary'
import { Loading } from './Loading'
import { initConfigPathAtom } from '@atoms/configAtom'

interface Props {
    configPath?: string
}

export const CLI: React.FC<Props> = React.memo((props: Props) => {
    const { configPath } = props
    return (
        <ErrorBoundary errorRender={ErrorText}>
            <Provider initialValues={[[initConfigPathAtom, configPath]]}>
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
})
