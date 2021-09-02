export interface NameWithOptionalDescription {
    name: string
    description?: string
}

export type CommitType = NameWithOptionalDescription
interface ResolveParameter {
    commitType: CommitType
    scope: NameWithOptionalDescription | null
    message: string
}
export interface Config {
    commitTypes: NameWithOptionalDescription[]
    scope?: NameWithOptionalDescription[]
    hasLongMessage?: boolean
    resolve?: (result: ResolveParameter) => string
}
