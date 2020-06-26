import { Input } from 'antd'
import { InputProps as AntInputProps } from 'antd/lib/input'
import React from 'react'
import { FieldRenderProps } from '../types'

export type TextInputProps = Partial<FieldRenderProps> & AntInputProps

export const TextInput: React.SFC<TextInputProps> = props => {
    const { field, form, required, label, error, isError, dirty, hidden, help, disabled, options, children, componentProps, ...otherProps } = props
    return (
        <Input
            {...componentProps}
            {...otherProps}
            {...field}
            disabled={disabled}
        />
    )
}
