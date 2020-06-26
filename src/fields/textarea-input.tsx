import { Input } from 'antd'
import React from 'react'
import { TextAreaProps as AnTextAreaProps } from 'antd/lib/input'
import { FieldRenderProps } from '../types'

export type TextAreaInputProps = Partial<FieldRenderProps> & AnTextAreaProps

export const TextAreaInput: React.SFC<TextAreaInputProps> = props => {
    const { field, form, required, label, error, isError, dirty, hidden, help, disabled, options, children, componentProps, ...otherProps } = props

    return (
        <Input.TextArea
            {...componentProps}
            {...otherProps}
            {...field}
            disabled={disabled}
        />
    )
}
