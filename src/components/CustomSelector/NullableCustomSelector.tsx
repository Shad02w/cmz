import React from 'react'
import { NameWithOptionalDescription } from '../../libs/config'
import { CustomSelector } from './index'

interface Props {
    list: NameWithOptionalDescription[]
    onSelect: (item: NameWithOptionalDescription | null) => void
    nullLabel?: string
}

export const NullableCustomSelector: React.FC<Props> = React.memo((props: Props) => {
    const { list, onSelect, nullLabel } = props
    const nullRef = React.useRef<NameWithOptionalDescription>({ name: nullLabel ?? '' })

    const handleSelect = (item: NameWithOptionalDescription) => {
        if (item === nullRef.current) onSelect(null)
        else onSelect(item)
    }

    return <CustomSelector list={[...list, nullRef.current]} onSelect={handleSelect} />
})
