import * as React from 'react'
import styled from 'styled-components'
import { FieldRenderProps } from '../types'


export interface IStaticProps extends Partial<FieldRenderProps> {
    align?: 'left' | 'center' | 'right'
    className?: string
    style?: React.CSSProperties
}

const Root = styled.div<IStaticProps>`
    text-align: ${props => props.align};
`

export const StaticInput: React.SFC<IStaticProps> = props => {
    const { field, form, required, label, error, isError, dirty, hidden, help, disabled, options, children, componentProps, ...otherProps } = props
    return (
        <Root
            {...componentProps}
            {...otherProps}
        >
            {field!.value || '-'}
        </Root>
    )
}

StaticInput.defaultProps = {
    align: 'left',
}
