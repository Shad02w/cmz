import React from 'react'
import { SelectListWithHint } from './SelectListWithHint'
import type { Props as SelectInputProps } from './SelectListWithHint'
import { Item } from 'ink-select-input/build/SelectInput'

interface Props<V> extends SelectInputProps<V> {
    onSelect: (item: Item<V> | null) => void
    nullText?: string
}

export const NullableSelectListWithHint = function <V>(props: Props<V>) {
    const { items, onSelect, nullText, ...resetProps } = props
    const nullRef = React.useRef<V>(Object.create({}))

    const handleSelect = (item: Item<V>) => {
        if (item.value === nullRef.current) onSelect(null)
        else onSelect(item)
    }

    return (
        <SelectListWithHint
            items={[...items, { label: nullText ? nullText : 'null', value: nullRef.current as V }]}
            onSelect={handleSelect}
            {...resetProps}
        />
    )
}
