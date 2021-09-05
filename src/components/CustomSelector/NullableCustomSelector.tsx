import React from 'react'
import { NameWithOptionalDescription } from '../../libs/config'
import { CustomSelector } from './index'

interface Props {
    list: NameWithOptionalDescription[]
    onSelect: (item: NameWithOptionalDescription | null) => void
}

export const NullableCustomSelector: React.FC<Props> = React.memo((props: Props) => {
    const { list, onSelect } = props
    const nullRef = React.useRef<NameWithOptionalDescription>({ name: '' })

    const handleSelect = (item: NameWithOptionalDescription) => {
        if (item === nullRef.current) onSelect(null)
        else onSelect(item)
    }

    return <CustomSelector list={[...list, nullRef.current]} onSelect={handleSelect} />
})
