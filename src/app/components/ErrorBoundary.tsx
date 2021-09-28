import React from 'react'

interface Props {
    errorRender: (error: Error) => React.ReactElement | null
}

interface State {
    error: Error | null
}

export class ErrorBoundary extends React.PureComponent<Props, State> {
    static displayName = 'ErrorBoundary'

    constructor(props: Props) {
        super(props)
        this.state = { error: null }
    }

    override componentDidCatch(error: Error) {
        this.setState({ error })
    }

    override render() {
        const { children, errorRender } = this.props
        const { error } = this.state
        return error ? errorRender(error) : children
    }
}
