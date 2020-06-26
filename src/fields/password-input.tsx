import { Input } from 'antd'
import { PasswordProps as AntPasswordProps } from 'antd/lib/input'
import React from 'react'
import { FieldRenderProps } from '../types'

export type PasswordInputProps = Partial<FieldRenderProps> & AntPasswordProps

export const PasswordInput: React.SFC<PasswordInputProps> = props => {
    const { field, form, required, label, error, isError, dirty, hidden, help, disabled, options, children, componentProps, ...otherProps } = props

    return (
        <Input.Password
            {...componentProps}
            {...otherProps}
            {...field}
            disabled={disabled}
        />
    )
}
