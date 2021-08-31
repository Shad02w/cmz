interface Info {
    name: string
    description?: string
}

type CommitType = Info

interface ResolveParameter {
    commitType: CommitType
    workspace: Info | null
    message: string
}
export interface Config {
    commitTypes: Info[]
    workspace?: Info[]
    hasLongMessage?: boolean
    resolve: (result: ResolveParameter) => string
}
