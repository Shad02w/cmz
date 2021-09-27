import React from 'react'
import { Indicator } from './Indicator'
import { ItemProps } from 'ink-select-input/build'
import { NameWithOptionalDescription } from '@libs/config'
import { Option } from './Option'
import { SelectListWithHint } from './SelectListWithHint'
import type { Item } from 'ink-select-input/build/SelectInput'

export interface Props {
    list: NameWithOptionalDescription[]
    onSelect: (item: NameWithOptionalDescription) => void
}

export const CustomSelector: React.FC<Props> = React.memo((props: Props) => {
    const { list, onSelect } = props
    const items: Item<NameWithOptionalDescription>[] = React.useMemo(
        () =>
            list.map((_, index) => ({
                key: index.toString(),
                label: _.name,
                value: _,
            })),
        [list]
    )

    const itemComponent = (props: ItemProps) => {
        const { label, isSelected } = props
        const commit = items.find(_ => _.label === label)!
        return <Option name={label} description={commit?.value.description} highlighted={isSelected === true} />
    }

    const handleSelect = (item: Item<NameWithOptionalDescription>) => onSelect(item.value)

    return (
        <SelectListWithHint
            limit={5}
            items={items}
            onSelect={handleSelect}
            itemComponent={itemComponent}
            indicatorComponent={Indicator}
        />
    )
})
