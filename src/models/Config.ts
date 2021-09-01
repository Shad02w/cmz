export interface NameWithOptionalDescription {
    name: string
    description?: string
}

export type CommitType = NameWithOptionalDescription
interface ResolveParameter {
    commitType: CommitType
    workspace: NameWithOptionalDescription | null
    message: string
}
export interface Config {
    commitTypes: NameWithOptionalDescription[]
    workspace?: NameWithOptionalDescription[]
    hasLongMessage?: boolean
    resolve: (result: ResolveParameter) => string
}
