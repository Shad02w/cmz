export interface Config {
    type: {
        name: string
        description?: string
    }
    workspace?: {
        name: string
        description?: string
    }
    hasLongMessage?: boolean
    resolve: (type: string, message: string, workspace?: string) => string
}
