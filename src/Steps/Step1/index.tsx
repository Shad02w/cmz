import React from 'react'
import { CommitTypeSelector } from './CommitTypeSelector'
import { StepContext, StepsContext } from '../../components/Steps'

interface Props {}

export const Step1 = (props: Props) => {
    return <CommitTypeSelector />
}
